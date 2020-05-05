export type PermissionsType = {
  app: string
  entity: string
  role: string
}

export interface ConnectorInterface {
  permissions(orgAddress: string): Promise<PermissionsType>
}
