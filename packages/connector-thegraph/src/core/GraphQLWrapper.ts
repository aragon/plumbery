import 'isomorphic-unfetch';
import { Client } from '@urql/core'
import { DocumentNode } from 'graphql';
import {
  ParseFunction,
  QueryResult
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
      throw new Error(`${error.message}${this._describeQueryResult(result)}`)
    }
  }

  protected async _performQuery(query: DocumentNode, args: any =  {}): Promise<QueryResult> {
    const result = await this.#client.query(
      query,
      args
    ).toPromise()
    // console.log(this._describeQueryResult(result)) // Uncomment for debugging.

    if (result.error) {
      throw new Error(`Error performing query.${this._describeQueryResult(result)}`)
    }

    return result
  }

  private _describeQueryResult(result: QueryResult): string {
    const queryStr = result.operation.query.loc?.source.body
    const dataStr = JSON.stringify(result.data, null, 2)
    const argsStr = JSON.stringify(result.operation.variables, null, 2)
    const subgraphUrl = result.operation.context.url

    return `\nSubgraph: ${subgraphUrl}\nArguments: ${argsStr}\nQuery: ${queryStr}Returned data: ${dataStr}`
  }
}