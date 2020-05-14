import { AbiItem, isAddress } from 'web3-utils'

import TransactionPath from '../TransactionPath'
import TransactionRequest from '../TransactionRequest'
import { createDirectTransactionForApp } from './transactions'
import App from '../../wrappers/App'
import Organization from '../../wrappers/Organization'
import { Permission } from 'plumbery-connector-thegraph/src/graphql/types'

export interface AragonArtifactFunction {
  roles: string[]
  sig: string
  /**
   * This field might not be able if the contract does not use
   * conventional solidity syntax and Aragon naming standards
   * null if there in no notice
   */
  notice: string | null
  /**
   * The function's ABI element is included for convenience of the client
   * null if ABI is not found for this signature
   */
  abi: AbiItem | null
}

export const ANY_ENTITY = '0xFFfFfFffFFfffFFfFFfFFFFFffFFFffffFfFFFfF'

export function addressesEqual(first: string, second: string): boolean {
  first = first && first.toLowerCase()
  second = second && second.toLowerCase()
  return first === second
}

// "Safer" version of [].includes() for addresses
export function includesAddress(arr: any[], address: string): boolean {
  return arr.some((a) => addressesEqual(a, address))
}

// TODO:
// export function getAppsFromPath(transactions: TransactionRequest[]): App[] {
//   return
// }

/**
 * Calculate the transaction path for a transaction to `destination`
 * that invokes `methodSignature` with `params`.
 *
 * @param  {string} [finalForwarder] Address of the final forwarder that can perfom the action.
 *                  Needed for actions that aren't in the ACL but whose execution depends on other factors
 * @return {Promise<TransactionPath>} An array of Ethereum transactions that describe each step in the path
 */
export async function calculateTransactionPath(
  sender: string,
  destination: string,
  methodSignature: string,
  params: string[],
  org: Organization,
  path?: string[],
  as?: string,
  finalForwarder?: string
): Promise<TransactionPath | null> {
  // Get the destination app
  const app = await org.app(destination)
  if (!app) {
    throw new Error(
      `Transaction path destination (${destination}) is not an installed app`
    )
  }

  // TODO: Add functions once we fetch ipfs metadata
  const methods: AragonArtifactFunction[] = app.functions
  if (!methods) {
    throw new Error(`No functions specified in artifact for ${destination}`)
  }

  // Find the relevant method information
  // Is the given method a full signature, e.g. 'foo(arg1,arg2,...)'
  const fullMethodSignature =
    Boolean(methodSignature) &&
    methodSignature.includes('(') &&
    methodSignature.includes(')')

  const method = methods.find((method) =>
    fullMethodSignature
      ? method.sig === methodSignature
      : // If the full signature isn't given, just select the first overload declared
        method.sig.split('(')[0] === methodSignature
  )
  if (!method) {
    throw new Error(`No method named ${methodSignature} on ${destination}`)
  }

  const finalForwarderProvided = finalForwarder
    ? isAddress(finalForwarder)
    : false

  const directTransaction = await createDirectTransactionForApp(
    sender,
    app,
    method.sig,
    params
  )

  // We can already assume the user is able to directly invoke the action if:
  //   - The method has no ACL requirements and no final forwarder was given, or
  //   - The final forwarder matches the sender
  if (
    (method.roles.length === 0 && !finalForwarderProvided) ||
    (finalForwarder && addressesEqual(finalForwarder, sender))
  ) {
    try {
      // `applyTransactionGas` can throw if the transaction will fail
      const transactions = await applyTransactionGas(directTransaction)

      return new TransactionPath({
        apps: [app],
        destination: app,
        transactions,
      })
    } catch (_) {
      // If the direct transaction fails, we give up as we should have been able to
      // perform the action directly
      return null
    }
  }

  // Failing this, attempt transaction pathing algorithm with forwarders
  const forwarders = (await org.apps()).filter(
    (app) => app.isForwarder === true
  )

  let forwardersWithPermission
  if (finalForwarderProvided) {
    if (finalForwarder && !includesAddress(forwarders, finalForwarder)) {
      // Final forwarder was given, but did not match any available forwarders, so no path
      // could be found
      return null
    }

    // Only attempt to find path with declared final forwarder; assume the final forwarder
    // is able to invoke the action
    forwardersWithPermission = [finalForwarder]
  } else {
    // Find entities with the required permissions
    const permissions = await org.permissions()
    const destinationPermissions = permissions.filter(
      (permission) => permission.entity === destination
    )

    const roles = await app.roles()
    const role = roles.find((role) => role.id === method.roles[0]).bytes
    const allowedEntities = role.allowedEntities

    // No one has access, so of course we don't as well
    if (allowedEntities.length === 0) {
      return null
    }

    // User may have permission; attempt direct transaction
    if (
      includesAddress(allowedEntities, sender) ||
      includesAddress(allowedEntities, ANY_ENTITY)
    ) {
      try {
        // `applyTransactionGas` can throw if the transaction will fail
        const transactions = await applyTransactionGas(directTransaction)

        return new TransactionPath({
          apps: [app],
          destination: app,
          transactions,
        })
      } catch (_) {
        // Don't immediately fail as the permission could have parameters applied that
        // disallows the user from the current action and forces us to use the full
        // pathing algorithm
      }
    }

    // Find forwarders with permission to perform the action
    forwardersWithPermission = forwarders.filter((forwarder) =>
      includesAddress(allowedEntities, forwarder.address)
    )
  }

  return calculateForwardingPath(
    sender,
    destination,
    directTransaction,
    forwardersWithPermission
  )
}
