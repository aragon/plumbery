import { ConnectorInterface, PermissionsType } from './ConnectorTypes'

class ConnectorJson implements ConnectorInterface {
  #permissions = []

  constructor(data: { permissions: PermissionsType }) {
    this.#permissions = data.permissions
  }

  async permissions(): Promise<PermissionsType> {
    return this.#permissions
  }
}

export default ConnectorJson
