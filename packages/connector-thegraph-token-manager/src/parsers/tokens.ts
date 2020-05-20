import { Token as TokenDataGql } from '../queries/types'
import { TokenData } from '../entities/Token'
import { QueryResult } from 'plumbery-connector-thegraph'

export function parseToken(
  result: QueryResult
): TokenData {
  const token = result.data.tokens[0] as TokenDataGql

  if (!token) {
    throw new Error('Unable to parse token.')
  }

  return token
}