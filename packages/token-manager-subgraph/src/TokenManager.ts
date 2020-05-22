import { NewVesting as NewVestingEvent } from '../generated/templates/TokenManager/TokenManager'
import { RevokeVesting as RevokeVestingEvent } from '../generated/templates/TokenManager/TokenManager'
import { ScriptResult as ScriptResultEvent } from '../generated/templates/TokenManager/TokenManager'
import { RecoverToVault as RecoverToVaultEvent } from '../generated/templates/TokenManager/TokenManager'
import { MiniMeToken as MiniMeTokenTemplate } from '../generated/templates'
import { InitializeCall } from '../generated/templates/TokenManager/TokenManager'
import { TokenManager as TokenManagerContract } from '../generated/templates/TokenManager/TokenManager'

export function handleProxyInitialize(call: InitializeCall): void {
  let tokenManagerAddress = call.to

  let tokenManagerContract = TokenManagerContract.bind(tokenManagerAddress)
  let tokenAddress = tokenManagerContract.token()

  MiniMeTokenTemplate.create(tokenAddress)
}

export function handleNewVesting(event: NewVestingEvent): void {}
export function handleRevokeVesting(event: RevokeVestingEvent): void {}
export function handleScriptResult(event: ScriptResultEvent): void {}
export function handleRecoverToVault(event: RecoverToVaultEvent): void {}
