export interface PermissionData {
  app: string
  entity: string
  role: string
}

export default class Permission implements PermissionData {
  app: string
  entity: string
  role: string

  constructor(data: PermissionData) {
    this.app = data.app
    this.entity = data.entity
    this.role = data.role
  }
}