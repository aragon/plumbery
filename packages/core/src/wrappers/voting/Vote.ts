import Base from "../Base"
import { ConnectorInterface } from "../../ConnectorTypes"

export interface VoteData {
  id: string
  creator: string
  metadata: string
  executed: boolean
}

export default class Vote extends Base implements VoteData {
  readonly id!: string
  readonly creator!: string
  readonly metadata!: string
  readonly executed!: boolean

  constructor(data: VoteData, connector: ConnectorInterface) {
    super(connector)

    Object.assign(this, data)
  }

  async casts(): Promise<any> {
    const voteId = this.id.split('0x')[1] // TODO: Remove this. Work around for vote data coming back as a hex string.

    return this.connector.execute!('voting', 'castsForVote', { voteId })
  }
}
