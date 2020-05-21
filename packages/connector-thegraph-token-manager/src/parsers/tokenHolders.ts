import { TokenHolder as TokenHolderDataGql } from '../queries/types'
import { TokenHolderData } from '../entities/TokenHolder'
import { QueryResult } from 'plumbery-connector-thegraph'

export function parseTokenHolders(
  result: QueryResult
): TokenHolderData[] {
  const holders = result.data.tokenHolders as TokenHolderDataGql[]

  if (!holders) {
    throw new Error('Unable to parse token holders.')
  }

  return holders.map((holder: TokenHolderDataGql): TokenHolderData => {
    return holder
  })
}