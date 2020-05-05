import { ConnectorInterface, PermissionsType } from 'plumbery-core'

export type ConnectorEthereumConfig = object

class ConnectorEthereum implements ConnectorInterface {
  #daoClient: any
  #appClient: any

  constructor({}: ConnectorEthereumConfig) {}

  async permissions(orgAddress: string): Promise<PermissionsType> {
    return {
      app: '',
      entity: '',
      role: ''
    }
  }
}

export default ConnectorEthereum
