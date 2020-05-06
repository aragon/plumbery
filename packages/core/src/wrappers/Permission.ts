import Base from "./Base"
import { ConnectorInterface } from "../ConnectorTypes"

export interface PermissionData {
  app: string
  entity: string
  role: string
}

export default class Permission extends Base implements PermissionData {
  app: string
  entity: string
  role: string

  constructor(data: PermissionData, connector: ConnectorInterface) {
    super(connector)

    this.app = data.app
    this.entity = data.entity
    this.role = data.role
  }
}