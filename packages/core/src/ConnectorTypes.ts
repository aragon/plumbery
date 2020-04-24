export type PermissionsType = Array<[string, Array<[string, Array<string>]>]>

export interface ConnectorInterface {
  permissions(): Promise<PermissionsType>

  on?(
    name: 'permissions',
    callback: (permissions: PermissionsType) => void
  ): void

  on?(name: 'error', callback: (error: Error) => void): void

  off?(name: 'permissions'): void
  off?(name: 'error'): void
}
