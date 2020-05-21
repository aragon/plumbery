import { Address, log, dataSource } from '@graphprotocol/graph-ts'
import { NewAppProxy as NewAppProxyEvent } from '../../../generated/templates/Kernel/Kernel'
import { Voting as VotingTemplate } from '../../../generated/templates'

const APP_ID = '0x9fa3927f639745e587912d4b0fea7ef9013bf93fb907d29faeab57417ba6e1d4'

function _createCustomAppTemplate(proxyAddress: Address): void {
  VotingTemplate.create(proxyAddress)
}

export function handleNewAppProxy(event: NewAppProxyEvent): void {
  log.info('Processing datasource {}', [dataSource.address().toHexString()])

  if (event.params.appId.toHexString() == APP_ID) {
    let proxyAddress = event.params.proxy

    _createCustomAppTemplate(proxyAddress)
  }
}
