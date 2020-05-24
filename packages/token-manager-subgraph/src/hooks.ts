import { Address } from '@graphprotocol/graph-ts'
import { initializeTokenManager } from './TokenManager'

export function getAppId(): string {
  return '0x6b20a3010614eeebf2138ccec99f028a61c811b3b1a3343b6ff635985c75c91f'
}

export function getAppTemplateName(): string {
  return 'TokenManager'
}

export function onAppTemplateCreated(orgAddress: Address, proxyAddress: Address): void {
  initializeTokenManager(orgAddress, proxyAddress)
}
