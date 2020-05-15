import { AragonArtifactFunction } from '../../types'
import {
  createDirectTransactionForApp,
  createForwarderTransactionBuilder,
  canForward,
  encodeCallScript,
  isFullMethodSignature,
} from './transactions'
import TransactionPath from '../TransactionPath'
import TransactionRequest from '../TransactionRequest'
import App from '../../wrappers/App'
import Organization from '../../wrappers/Organization'

const getAppsFromPath = (orgApps: App[], path: string[]): App[] =>
  orgApps.filter((app) => path.some((address) => address === app.address))

async function validateData(
  org: Organization,
  destination: string,
  methodSignature: string
): Promise<{
  app: App
  method: AragonArtifactFunction
}> {
  // Get the destination app
  const app = await org.app(destination)
  if (!app) {
    throw new Error(
      `Transaction path destination (${destination}) is not an installed app`
    )
  }

  const methods: AragonArtifactFunction[] = app.functions
  if (!methods) {
    throw new Error(`No functions specified in artifact for ${destination}`)
  }

  // Find the relevant method information
  const method = methods.find((method) =>
    isFullMethodSignature(methodSignature)
      ? method.sig === methodSignature
      : // If the full signature isn't given, just select the first overload declared
        method.sig.split('(')[0] === methodSignature
  )
  if (!method) {
    throw new Error(`No method named ${methodSignature} on ${destination}`)
  }

  return {
    app,
    method,
  }
}

/**
 * Calculate the transaction path for a transaction to `destination`
 * that invokes `methodSignature` with `params`.
 * @return {Promise<TransactionPath>} An array of Ethereum transactions that describe each step in the path
 */
export async function verifyTransactionPath(
  sender: string,
  path: string[],
  destination: string,
  methodSignature: string,
  params: any[],
  org: Organization
): Promise<TransactionPath> {
  const transactions: TransactionRequest[] = []

  // Make sure the destination app exists and the method signature is correct
  const { app, method } = await validateData(org, destination, methodSignature)

  const directTransaction = await createDirectTransactionForApp(
    sender,
    app,
    method.sig,
    params
  )

  // TODO: handle pretransactions specified in the intent
  // This is difficult to do generically, as some pretransactions
  // (e.g. token approvals) only work if they're for a specific target
  delete directTransaction.pretransaction

  const createForwarderTransaction = createForwarderTransactionBuilder(
    sender,
    directTransaction
  )

  // Assign the directTransaction as the first transaction to be encoded
  let transaction = directTransaction

  // Iterate on the path provided making sure the canForward hold true
  // betwen steps on the path. On every step we create a forwarder
  // transaction adding it to the transactions list encoding the previous one
  for (let index = 1; index < path.length; index++) {
    const forwarder = path[index]
    const previousForwarder = path[index - 1]

    const script = encodeCallScript(transaction)

    if (canForward(previousForwarder, forwarder, script)) {
      transaction = createForwarderTransaction(forwarder, script)
      transactions.push[transaction]
    } else {
      throw new Error(
        `Can not forward action from ${previousForwarder} to ${forwarder}. Do you have the right permissions?`
      )
    }
  }

  try {
    const transactionWithFee = await applyForwardingFeePretransaction(
      transactions[0]
    )
    // `applyTransactionGas` can throw if the transaction will fail
    // If that happens, we give up as we should've been able to perform the action with this
    // forwarding path
    transactions[0] = await applyTransactionGas(transactionWithFee, true)

    const apps = await org.apps()

    return new TransactionPath({
      apps: getAppsFromPath(apps, path),
      destination: app,
      transactions,
    })
  } catch (error) {
    // TODO: Check if still the case with TransactionRequest
    throw new Error(
      `You have the right permissions but the transaction will fail. Make sure to provide other parameters.`
    )
  }
}
