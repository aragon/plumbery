export type PermissionsType = Array<[string, Array<[string, Array<string>]>]>

export interface ConnectorInterface {
  permissions(orgAddress: string): Promise<PermissionsType>
}
