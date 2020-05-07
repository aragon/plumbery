import Base from "./Base"
import { ConnectorInterface } from "../ConnectorTypes"

export interface RepoData {
  name?: string
  address: string
}

export default class Repo extends Base implements RepoData {
  readonly name?: string
  readonly address!: string

  constructor(data: RepoData, connector: ConnectorInterface) {
    super(connector)

    Object.assign(this, data)
  }
}
