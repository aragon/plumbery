import { DataSourceTemplate } from '@graphprotocol/graph-ts'
import { NewAppProxy as NewAppProxyEvent } from '../../../generated/templates/Kernel/Kernel'
import * as config from '../../config'

export function handleNewAppProxy(event: NewAppProxyEvent): void {
  if (event.params.appId.toHexString() == config.APP_ID) {
    let proxyAddress = event.params.proxy

    DataSourceTemplate.create(config.APP_TEMPLATE_NAME, [proxyAddress.toHex()]);
  }
}
