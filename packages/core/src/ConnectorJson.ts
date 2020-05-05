import { ConnectorInterface, Permission } from './ConnectorTypes'

export type ConnectorJsonConfig = { permissions: Permission[] }

class ConnectorJson implements ConnectorInterface {
  #permissions: Permission[]

  constructor({ permissions }: ConnectorJsonConfig) {
    this.#permissions = permissions
  }

  async permissions(): Promise<Permission[]> {
    return this.#permissions
  }
}

export default ConnectorJson
