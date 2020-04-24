import Organization from './Organization'

export default class Connection {
  connector: string

  constructor(connector) {
    this.connector = connector
  }

  organization(address: string) {
    return new Organization()
  }
}
