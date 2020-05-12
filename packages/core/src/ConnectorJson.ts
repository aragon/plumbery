import { ConnectorInterface } from './ConnectorTypes'
import Permission from './wrappers/Permission'

export type ConnectorJsonConfig = { permissions: Permission[] }

class ConnectorJson implements ConnectorInterface {
  #permissions: Permission[]

  constructor({ permissions }: ConnectorJsonConfig) {
    this.#permissions = permissions
  }

  async permissionsForOrg(): Promise<Permission[]> {
    return this.#permissions
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  dummy(): void {}
}

export default ConnectorJson
