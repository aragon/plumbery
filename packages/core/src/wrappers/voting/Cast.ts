import Base from "../Base"
import { ConnectorInterface } from "../../ConnectorTypes"

export interface CastData {
  id: string
  voteId: string
  voter: string
  supports: boolean
}

export default class Cast extends Base implements CastData {
  readonly id!: string
  readonly voteId!: string
  readonly voter!: string
  readonly supports!: boolean

  constructor(data: CastData, connector: ConnectorInterface) {
    super(connector)

    Object.assign(this, data)
  }
}
