import { Cast as CastDataGql } from '../queries/types'
import { CastData } from '../entities/Cast'
import { QueryResult } from '../../types'

export function parseCasts(
  data: QueryResult
): CastData[] {
  const casts = data.casts

  if (!casts) {
    throw new Error('Unable to parse casts.')
  }

  return casts.map((cast: CastDataGql) => {
    return {
      id: cast.id,
      voteId: cast.voteId,
      voter: cast.voter,
      supports: cast.supports
    }
  })
}