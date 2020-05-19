import * as queries from './queries'
import VotingVote, { VoteData } from "./entities/VotingVote";
import VotingCast, { CastData } from "./entities/VotingCast";
import { GraphQLWrapper } from "..";
import {
  parseVotes,
  parseCasts
} from './parsers';

export default class VotingConnectorTheGraph extends GraphQLWrapper {
  async votesForApp(appAddress: string): Promise<VotingVote[]> {
    const result = await this.performQuery(
      queries.ALL_VOTES,
      { appAddress }
    )

    const datas = this.parseQueryResult(parseVotes, result)

    return datas.map((data: VoteData) => {
      return new VotingVote(data, this)
    })
  }

  async castsForVote(voteId: string): Promise<VotingCast[]> {
    const result = await this.performQuery(
      queries.CASTS_FOR_VOTE,
      { voteId }
    )

    const datas = this.parseQueryResult(parseCasts, result)

    return datas.map((data: CastData) => {
      return new VotingCast(data, this)
    })
  }
}