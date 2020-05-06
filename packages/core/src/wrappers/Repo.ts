import Base from "./Base"
import { ConnectorInterface } from "../ConnectorTypes"

export interface RepoData {
  name?: string
  address: string
}

export default class Repo extends Base implements RepoData {
  name?: string
  address: string

  constructor(data: RepoData, connector: ConnectorInterface) {
    super(connector)

    this.name = data.name
    this.address = data.address
  }
}
