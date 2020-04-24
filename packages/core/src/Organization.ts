import App from './App'
import TransactionPathCollection from './TransactionPathCollection'

export default class Organization {
  // List of the apps installed in the organization
  apps() {
    return {}
  }

  // List of the apps installed in the organization
  permissions() {
    return []
  }

  // Get the transaction paths that could work to execute something
  exec(app: App, method: string, params: string[]): TransactionPathCollection {
    return new TransactionPathCollection()
  }
}
