import { ConnectorInterface, PermissionsType } from 'plumbery-core'

export type ConnectorEthereumConfig = object

class ConnectorEthereum implements ConnectorInterface {
  #daoClient: any
  #appClient: any

  constructor({}: ConnectorEthereumConfig) {}

  async permissions(orgAddress: string): Promise<PermissionsType> {
    return []
  }
}

export default ConnectorEthereum
