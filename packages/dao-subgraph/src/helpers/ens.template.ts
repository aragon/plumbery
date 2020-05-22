import { Address, Bytes, log } from '@graphprotocol/graph-ts'

import { ENS } from '../types/templates/Organization/ENS'
import { PublicResolver } from '../types/templates/Organization/PublicResolver'

const ENS_ADDRESS = '{{ens}}'

export function resolveRepo(appId: Bytes): string | null {
  const ens = ENS.bind(Address.fromString(ENS_ADDRESS))

  let callEnsResult = ens.try_resolver(appId)
  if (callEnsResult.reverted) {
    log.info('ens reverted', [])
  } else {
    const resolver = PublicResolver.bind(callEnsResult.value)
    let callResolverResult = resolver.try_addr(appId)
    if (callResolverResult.reverted) {
      log.info('resolver reverted', [])
    } else {
      return callResolverResult.value.toHex()
    }
  }
  return null
}
