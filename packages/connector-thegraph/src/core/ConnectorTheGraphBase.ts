import { Client } from '@urql/core'
import { DocumentNode } from 'graphql';
import {
  ParseFunction,
  QueryResult,
  DataGql
} from '../types'

export default class ConnectorTheGraphBase {
  #client: Client

  constructor(subgraphUrl: string) {
    this.#client = new Client({
      maskTypename: true,
      url: subgraphUrl,
    })
  }

  protected _parseQuery(parser: ParseFunction, result: QueryResult, data: DataGql): any {
    try {
      return parser(data)
    } catch (error) {
      throw new Error(`${error.message} The query results where:\n${
        JSON.stringify(result, null, 2)
      }`)
    }
  }

  protected async _performQuery(query: DocumentNode, vars: any =  {}): Promise<QueryResult> {
    const results = await this.#client.query(
      query,
      vars
    ).toPromise()

    if (results.error) {
      const queryStr = query.loc?.source.body
      throw new Error(`Error while connecting to the subgraph at ${this.#client.url} with query: ${queryStr}\n Error: ${results.error}`)
    }

    return results.data
  }
}