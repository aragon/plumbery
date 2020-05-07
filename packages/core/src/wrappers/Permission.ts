import Base from "./Base"
import { ConnectorInterface } from "../ConnectorTypes"

export interface PermissionData {
  app: string
  entity: string
  role: string
}

export default class Permission extends Base implements PermissionData {
  readonly app!: string
  readonly entity!: string
  readonly role!: string

  constructor(data: PermissionData, connector: ConnectorInterface) {
    super(connector)

    Object.assign(this, data)
  }
}
