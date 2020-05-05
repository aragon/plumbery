export type Permission = {
  app: string
  entity: string
  role: string
}

export interface ConnectorInterface {
  permissions(orgAddress: string): Promise<Permission[]>
}
