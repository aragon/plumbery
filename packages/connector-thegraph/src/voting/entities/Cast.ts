import Entity from "./Entity";
import VotingConnectorTheGraph from "..";

export interface CastData {
  id: string
  voteId: string
  voter: string
  supports: boolean
}

export default class Cast extends Entity implements CastData {
  readonly id!: string
  readonly voteId!: string
  readonly voter!: string
  readonly supports!: boolean

  constructor(data: CastData, connector: VotingConnectorTheGraph) {
    super(connector)

    Object.assign(this, data)
  }
}