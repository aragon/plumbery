import App from './App'
import TransactionPath from '../TransactionPath'
import { SignerType } from '../SignerTypes'
import { ConnectorInterface } from '../ConnectorTypes'
import Permission from './Permission'
import Entity from './Entity'

// TODO: Implement all properties and methods from the API spec (https://github.com/aragon/plumbery/blob/master/docs/organization.md).
// [x] Organization#apps()
// [x] Organization#app(appAddress)
// [ ] Organization#addApp(repoName, options)
// [ ] Organization#removeApp(appAddress)
// [x] Organization#permissions()
// [ ] Organization#addPermission(address, appAddress, roleId)
// [ ] Organization#removePermission(address, appAddress, roleId)
// [ ] Organization#roleManager(appAddress, roleId)
// [ ] Organization#setRoleManager(address, appAddress, roleId)
// [ ] Organization#appIntent(appAddress, funcName, funcArgs)
// [ ] Organization#appCall(appAddress, methodName, args)
// [ ] Organization#appState(appAddress)
// [ ] Organization#on(event, params, callback)
// [ ] Organization#off(event, callback)
// [ ] Organization#off(event)
// [ ] Organization#off()
// [ ] Events...

export default class Organization extends Entity {
  readonly address: string

  #signer: SignerType

  constructor(
    address: string,
    connector: ConnectorInterface,
    signer: SignerType
  ) {
    super(connector)

    this.address = address

    this.#signer = signer
  }

  async apps(): Promise<App[]> {
    return this._connector.appsForOrg!(this.address)
  }

  async app(appAddress: string): Promise<App> {
    return this._connector.appByAddress!(appAddress)
  }

  async permissions(): Promise<Permission[]> {
    return this._connector.permissionsForOrg(this.address)
  }

  // Get the transaction paths that could work to execute something
  async execPaths(
    app: App,
    method: string,
    params: string[]
  ): Promise<TransactionPath[]> {
    return []
  }
}
