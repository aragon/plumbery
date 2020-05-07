import Repo from "./Repo"
import Base from "./Base"
import { ConnectorInterface } from "../ConnectorTypes"

export interface AppData {
  appName?: string
  address: string
}

export default class App extends Base implements AppData {
  readonly appName?: string
  readonly address!: string
  readonly appId!: string
  readonly version!: string

  constructor(data: AppData, connector: ConnectorInterface) {
    super(connector)

    this.name = data.name
    this.address = data.address
  }

  async repo(): Promise<Repo> {
    return this._connector.repoForApp!(this.address)
  }
}
