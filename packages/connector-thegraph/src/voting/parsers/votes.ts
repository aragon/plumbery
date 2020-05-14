import { Vote as VoteDataGql } from '../queries/types'
import { VoteData } from '../entities/Vote'
import { QueryResult } from '../../types'

export function parseVotes(
  result: QueryResult
): VoteData[] {
  const votes = result.data.votes

  if (!votes) {
    throw new Error('Unable to parse votes.')
  }

  return votes.map((vote: VoteDataGql) => {
    return {
      id: vote.id,
      creator: vote.creator,
      metaresult: vote.metadata,
      executed: vote.executed
    }
  })
}