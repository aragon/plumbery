import App from './App'
import TransactionPath from './TransactionPath'

export default class Organization {
  #address: string
  #connector: any
  #signer: any

  constructor(address, connector, signer) {
    this.#address = address
    this.#connector = connector
    this.#signer = signer
  }

  // List of the apps installed in the organization
  async apps() {
    return {}
  }

  // List of the apps installed in the organization
  async permissions() {
    return this.#connector.permissions(this.#address)
  }

  // Get the transaction paths that could work to execute something
  async execPaths(
    app: App,
    method: string,
    params: string[]
  ): Promise<TransactionPath[]> {
    return []
  }
}
