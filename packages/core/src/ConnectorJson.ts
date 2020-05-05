import { ConnectorInterface, PermissionsType } from './ConnectorTypes'

export type ConnectorJsonConfig = { permissions: PermissionsType }

class ConnectorJson implements ConnectorInterface {
  #permissions: PermissionsType

  constructor({ permissions }: ConnectorJsonConfig) {
    this.#permissions = permissions
  }

  async permissions(): Promise<PermissionsType> {
    return this.#permissions
  }
}

export default ConnectorJson
