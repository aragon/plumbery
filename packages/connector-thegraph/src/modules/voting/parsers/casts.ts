import { Cast as CastDataGql } from '../queries/types'
import { ConnectorTheGraph } from "plumbery-core";
import { QueryResult } from "packages/connector-thegraph/src/types";

export function parseCasts(
  connector: ConnectorTheGraph,
  data: QueryResult
): any[] {
  const casts = data.casts as CastDataGql[]

  if (!casts) {
    throw new Error('Unable to parse casts.')
  }

  return casts.map((cast: CastDataGql) => {
    return cast
    // return new Cast({
    //   id: vote.id,
    //   creator: vote.creator,
    //   metadata: vote.metadata,
    //   executed: vote.executed
    // })
  })
}