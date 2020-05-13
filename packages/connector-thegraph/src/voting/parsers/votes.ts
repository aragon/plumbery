import { Vote as VoteDataGql } from '../queries/types'
import { VoteData } from '../entities/Vote'
import { QueryResult } from '../../types'

export function parseVotes(
  data: QueryResult
): VoteData[] {
  const votes = data.votes

  if (!votes) {
    throw new Error('Unable to parse votes.')
  }

  return votes.map((vote: VoteDataGql) => {
    return {
      id: vote.id,
      creator: vote.creator,
      metadata: vote.metadata,
      executed: vote.executed
    }
  })
}