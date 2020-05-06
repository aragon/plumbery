import Repo from "./Repo"
import Base from "./Base"
import { ConnectorInterface } from "../ConnectorTypes"

export interface AppData {
  name?: string
  address: string
}

export default class App extends Base implements AppData {
  name?: string
  address: string

  constructor(data: AppData, connector: ConnectorInterface) {
    super(connector)

    this.name = data.name
    this.address = data.address
  }

  async repo(): Promise<Repo> {
    return this._connector.repoForApp!(this.address)
  }
}
