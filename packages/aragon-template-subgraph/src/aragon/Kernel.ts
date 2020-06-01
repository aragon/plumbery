import { NewAppProxy as NewAppProxyEvent } from '../../generated/templates/Kernel/Kernel'
import { processApp } from './helpers/aragon'

export function handleNewAppProxy(event: NewAppProxyEvent): void {
  processApp(event.params.proxy, event.params.appId.toHexString())
}
