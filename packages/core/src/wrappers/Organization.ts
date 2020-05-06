import App from './App'
import TransactionPath from '../TransactionPath'
import { SignerType } from '../SignerTypes'
import { ConnectorInterface } from '../ConnectorTypes'
import Permission from './Permission'

export default class Organization {
  #address: string
  #connector: ConnectorInterface
  #signer: SignerType

  constructor(
    address: string,
    connector: ConnectorInterface,
    signer: SignerType
  ) {
    this.#address = address
    this.#connector = connector
    this.#signer = signer
  }

  // List of the apps installed in the organization
  async apps(): Promise<App[]> {
    return this.#connector.appsForOrg!(this.#address)
  }

  // List of the apps installed in the organization
  async permissions(): Promise<Permission[]> {
    return this.#connector.permissionsForOrg(this.#address)
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
