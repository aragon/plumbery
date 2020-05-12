import { Cast as CastDataGql } from '../queries/types'
import { Cast, ConnectorTheGraph } from "plumbery-core";
import { QueryResult } from "packages/connector-thegraph/src/types";

export function parseCasts(
  connector: ConnectorTheGraph,
  data: QueryResult
): Cast[] {
  const casts = data.casts as CastDataGql[]

  if (!casts) {
    throw new Error('Unable to parse casts.')
  }

  return casts.map((cast: CastDataGql) => {
    return new Cast({
      id: cast.id,
      voteId: cast.voteId,
      voter: cast.voter,
      supports: cast.supports
    }, connector)
  })
}