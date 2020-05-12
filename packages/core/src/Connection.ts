import Organization from './wrappers/org/Organization'
import { ConnectorInterface } from './ConnectorTypes'

export default class Connection {
  #connector: ConnectorInterface
  #signer: any

  constructor(connector: ConnectorInterface, signer: any) {
    this.#connector = connector
    this.#signer = signer
  }

  organization(address: string): Organization {
    return new Organization(address, this.#connector, this.#signer)
  }
}
