import 'isomorphic-unfetch';
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

  protected _parseQuery(parser: ParseFunction, result: QueryResult): any {
    try {
      return parser(result)
    } catch (error) {
      throw new Error(`${error.message} The query results where:\n${
        JSON.stringify(result, null, 2)
      }`)
    }
  }

  protected async _performQuery(query: DocumentNode, args: any =  {}): Promise<QueryResult> {
    const results = await this.#client.query(
      query,
      args
    ).toPromise()

    if (results.error) {
      const queryStr = query.loc?.source.body
      const argsStr = JSON.stringify(args, null, 2)
      throw new Error(`Error performing query.\nArguments:${argsStr}\nQuery: ${queryStr}\nSubgraph:${this.#client.url}`)
    }

    return results.data
  }
}