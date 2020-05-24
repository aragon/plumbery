import { Address } from '@graphprotocol/graph-ts'
import { TokenManager as TokenManagerContract } from '../generated/templates/TokenManager/TokenManager'
import { TokenManager as TokenManagerEntity } from '../generated/schema'
import { initializeMiniMeToken } from './MiniMeToken'
// import { NewVesting as NewVestingEvent } from '../generated/templates/TokenManager/TokenManager'
// import { RevokeVesting as RevokeVestingEvent } from '../generated/templates/TokenManager/TokenManager'
// import { ScriptResult as ScriptResultEvent } from '../generated/templates/TokenManager/TokenManager'
// import { RecoverToVault as RecoverToVaultEvent } from '../generated/templates/TokenManager/TokenManager'

export function initializeTokenManager(orgAddress: Address, proxyAddress: Address): void {
  let tokenManagerId = 'proxyAddress-' + proxyAddress.toHexString()
  let tokenManagerEntity = new TokenManagerEntity(tokenManagerId)

  tokenManagerEntity.address = proxyAddress
  tokenManagerEntity.orgAddress = orgAddress

  let tokenManagerContract = TokenManagerContract.bind(proxyAddress)
  let tokenAddress = tokenManagerContract.token()
  if (tokenAddress.toHexString() != '0x0000000000000000000000000000000000000000') {
    initializeMiniMeToken(tokenManagerEntity.id, proxyAddress, orgAddress, tokenAddress)
  }

  tokenManagerEntity.save()
}

// export function handleNewVesting(event: NewVestingEvent): void {}
// export function handleRevokeVesting(event: RevokeVestingEvent): void {}
// export function handleScriptResult(event: ScriptResultEvent): void {}
// export function handleRecoverToVault(event: RecoverToVaultEvent): void {}
