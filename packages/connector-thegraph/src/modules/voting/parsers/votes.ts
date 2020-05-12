import { Vote as VoteDataGql } from '../queries/types'
import { ConnectorTheGraph } from "plumbery-core";
import { QueryResult } from "packages/connector-thegraph/src/types";

export function parseVotes(
  connector: ConnectorTheGraph,
  data: QueryResult
): any {
  const votes = data.votes as VoteDataGql[]

  return votes
}