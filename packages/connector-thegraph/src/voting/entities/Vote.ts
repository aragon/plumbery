import VotingEntity from "./VotingEntity";
import Cast from './Cast'
import VotingConnectorTheGraph from "..";

export interface VoteData {
  id: string
  creator: string
  metadata: string
  executed: boolean
}

export default class Vote extends VotingEntity implements VoteData {
  readonly id!: string
  readonly creator!: string
  readonly metadata!: string
  readonly executed!: boolean

  constructor(data: VoteData, connector: VotingConnectorTheGraph) {
    super(connector)

    Object.assign(this, data)
  }

  async casts(): Promise<Cast[]> {
    const voteId = this.id.split('0x')[1] // TODO: Remove this. Work around for vote data coming back as a hex string.

    return this._connector.castsForVote(voteId)
  }
}