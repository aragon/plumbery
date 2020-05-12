import Base from "./Base"
import App from './App'
import Role from './Role'
import { ConnectorInterface } from "../ConnectorTypes"

// TODO: Implement all properties and methods from the API spec (https://github.com/aragon/plumbery/blob/master/docs/permission.md).
// [x] app 	String 	App address.
// [x] entity 	String 	Entity address receiving the permission.
// [x] role 	String 	Role identifier.
// [x] getApp()
// [x] getRole()

export interface PermissionData {
  app: string
  entity: string
  role: string
  id: string
}

export default class Permission extends Base implements PermissionData {
  readonly app!: string
  readonly entity!: string
  readonly role!: string
  readonly id!: string

  constructor(data: PermissionData, connector: ConnectorInterface) {
    super(connector)

    Object.assign(this, data)
  }

  async getApp(): Promise<App | void> {
    if (!this.app) {
      return
    }

    return this._connector.execute!('org', 'appByAddress', { appAddress: this.app })
  }

  async getRole(): Promise<Role> {
    const roleId = `${this.entity}-${this.role}`

    return this._connector.execute!('org', 'roleById', { roleId })
  }
}
