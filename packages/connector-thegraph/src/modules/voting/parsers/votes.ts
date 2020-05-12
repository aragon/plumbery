import { Vote as VoteDataGql } from '../queries/types'
import { Vote, ConnectorTheGraph } from "plumbery-core";
import { QueryResult } from "packages/connector-thegraph/src/types";

export function parseVotes(
  connector: ConnectorTheGraph,
  data: QueryResult
): Vote[] {
  const votes = data.votes as VoteDataGql[]

  if (!votes) {
    throw new Error('Unable to parse votes.')
  }

  return votes.map((vote: VoteDataGql) => {
    return new Vote({
      id: vote.id,
      creator: vote.creator,
      metadata: vote.metadata,
      executed: vote.executed
    }, connector)
  })
}