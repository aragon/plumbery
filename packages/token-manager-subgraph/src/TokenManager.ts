import { Address } from '@graphprotocol/graph-ts'
import { NewVesting as NewVestingEvent } from '../generated/templates/TokenManager/TokenManager'
import { RevokeVesting as RevokeVestingEvent } from '../generated/templates/TokenManager/TokenManager'
import { ScriptResult as ScriptResultEvent } from '../generated/templates/TokenManager/TokenManager'
import { RecoverToVault as RecoverToVaultEvent } from '../generated/templates/TokenManager/TokenManager'
import { TokenManager as TokenManagerContract } from '../generated/templates/TokenManager/TokenManager'
import { TokenManager as TokenManagerEntity } from '../generated/schema'
import { MiniMeToken as MiniMeTokenTemplate } from '../generated/templates'

export function initializeTokenManager(proxyAddress: Address): void {
  let tokenManagerEntity = new TokenManagerEntity(proxyAddress.toHexString())
  tokenManagerEntity.save()

  let tokenManager = TokenManagerContract.bind(proxyAddress)

  let tokenAddress = tokenManager.token()
  MiniMeTokenTemplate.create(tokenAddress)
}

export function handleNewVesting(event: NewVestingEvent): void {}
export function handleRevokeVesting(event: RevokeVestingEvent): void {}
export function handleScriptResult(event: ScriptResultEvent): void {}
export function handleRecoverToVault(event: RecoverToVaultEvent): void {}
