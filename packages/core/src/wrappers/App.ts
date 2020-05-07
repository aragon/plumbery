import Repo from "./Repo"
import Base from "./Base"
import { ConnectorInterface } from "../ConnectorTypes"

export interface AppData {
  name?: string
  address: string
  appId: string
}

export default class App extends Base implements AppData {
  readonly name?: string
  readonly address!: string
  readonly appId!: string

  constructor(data: AppData, connector: ConnectorInterface) {
    super(connector)

    Object.assign(this, data)
  }

  async repo(): Promise<Repo> {
    return this._connector.repoForApp!(this.address)
  }
}
