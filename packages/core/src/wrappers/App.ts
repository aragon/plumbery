import Repo from "./Repo"
import Base from "./Base"
import { ConnectorInterface } from "../ConnectorTypes"

export interface AppData {
  appName?: string
  address: string
  appId: string
  version: string
}

export default class App extends Base implements AppData {
  readonly appName?: string
  readonly address!: string
  readonly appId!: string
  readonly version!: string

  constructor(data: AppData, connector: ConnectorInterface) {
    super(connector)

    Object.assign(this, data)
  }

  async repo(): Promise<Repo> {
    return this._connector.repoForApp!(this.address)
  }
}
