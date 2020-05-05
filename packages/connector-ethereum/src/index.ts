import { ConnectorInterface, Permission } from 'plumbery-core'

export type ConnectorEthereumConfig = object

class ConnectorEthereum implements ConnectorInterface {
  #daoClient: any
  #appClient: any

  constructor({}: ConnectorEthereumConfig) {}

  async permissions(orgAddress: string): Promise<Permission[]> {
    return []
  }
}

export default ConnectorEthereum
