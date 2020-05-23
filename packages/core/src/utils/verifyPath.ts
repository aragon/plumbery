import { ethers } from 'ethers'

import { AppIntent } from '../types'
import App from '../entities/App'
import Organization from '../entities/Organization'
import TransactionPath from '../transactions/TransactionPath'
import TransactionRequest, {
  TransactionRequestData,
} from '../transactions/TransactionRequest'
import { canForward } from '../utils/canForward'
import { encodeCallScript } from '../utils/encodeCallScript'
import { isFullMethodSignature } from '../utils/isFullMethodSignature'
import {
  createDirectTransactionForApp,
  createForwarderTransactionBuilder,
  applyForwardingFeePretransaction,
  applyTransactionGas,
} from '../utils/transactions'

const getAppsFromPath = (orgApps: App[], path: string[]): App[] =>
  orgApps.filter((app) => path.some((address) => address === app.address))

async function validateData(
  org: Organization,
  destination: string,
  methodSignature: string
): Promise<{
  app: App
  method: AppIntent
}> {
  // Get the destination app
  const app = await org.app(destination)
  if (!app) {
    throw new Error(
      `Transaction path destination (${destination}) is not an installed app`
    )
  }

  const methods = app.intents
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
  org: Organization,
  provider: ethers.providers.Provider
): Promise<TransactionPath> {
  const transactions = []

  // Make sure the destination app exists and the method signature is correct
  const { app, method } = await validateData(org, destination, methodSignature)

  const directTransaction = createDirectTransactionForApp(
    sender,
    app,
    method.sig,
    params
  )

  const createForwarderTransaction = createForwarderTransactionBuilder(
    sender,
    directTransaction
  )

  // Assign the directTransaction as the first transaction to be encoded
  const transaction = directTransaction

  // Iterate on the path provided making sure the canForward hold true
  // betwen steps on the path. On every step we create a forwarder
  // transaction adding it to the transactions list encoding the previous one
  for (let index = 1; index < path.length; index++) {
    const forwarder = path[index]
    const previousForwarder = path[index - 1]

    const script = encodeCallScript([transaction])

    if (canForward(previousForwarder, forwarder, script, provider)) {
      const forwarderTransaction = createForwarderTransaction(forwarder, script)

      transactions.push(forwarderTransaction)
    } else {
      throw new Error(
        `Can not forward action from ${previousForwarder} to ${forwarder}. Do you have the right permissions?`
      )
    }
  }

  try {
    const transactionWithFee = await applyForwardingFeePretransaction(
      transactions[0],
      provider
    )
    // `applyTransactionGas` can throw if the transaction will fail
    // If that happens, we give up as we should've been able to perform the action with this
    // forwarding path
    const { gas, gasLimit, gasPrice } = await applyTransactionGas(
      transactionWithFee,
      true,
      provider
    )

    const chainId = (await provider.getNetwork()).chainId

    const transactionRequests: TransactionRequest[] = transactions.map(
      (transaction) => {
        return new TransactionRequest({
          ...transaction,
          chainId,
          gas,
          gasLimit,
          gasPrice,
        })
      }
    )

    const apps = await org.apps()

    return new TransactionPath({
      apps: getAppsFromPath(apps, path),
      destination: app,
      transactions: transactionRequests,
    })
  } catch (error) {
    // TODO: Check if still the case with TransactionRequest
    throw new Error(
      `You have the right permissions but the transaction will fail. Make sure to provide other parameters.`
    )
  }
}
