import Organization from './Organization'

export default class Connection {
  connector: string
  signer: any

  constructor(connector, signer) {
    this.connector = connector
    this.signer = signer
  }

  organization(address: string) {
    return new Organization()
  }
}
