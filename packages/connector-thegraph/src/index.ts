import 'isomorphic-unfetch';
import { Client } from '@urql/core'
import { DocumentNode } from 'graphql';
import { ConnectorInterface } from 'plumbery-core'
import { Module, ParseFunction, QueryResult } from './types';

export type ConnectorTheGraphConfig = {
  daoSubgraphUrl: string
  modules: [string]
}

class ConnectorTheGraph implements ConnectorInterface {
  #daoClient: Client

  #modules: {
    [moduleName: string]: Module
  }

  constructor(config: ConnectorTheGraphConfig) {
    this.#daoClient = new Client({
      maskTypename: true,
      url: config.daoSubgraphUrl,
    })

    this.#modules = {}
    this.loadModule('org', config.daoSubgraphUrl)
  }

  loadModule(moduleName: string, subgraphUrl: string): void {
    if (this.#modules[moduleName]) {
      throw new Error(`Module ${moduleName} already loaded.`)
    }

    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const module = require(`./modules/${moduleName}`).default
    module.subgraphUrl = subgraphUrl

    this.#modules[moduleName] = module
  }

  async execute(moduleName: string, selectorName: string, args: any = {}): Promise<any> {
    const module = this.#modules[moduleName]
    if (!module) {
      throw new Error(`Invalid module "${moduleName}".`)
    }

    const selector = module.selectors[selectorName]

    const result = await this._performQuery(
      selector.query,
      args
    )

    return this._parseQuery(selector.parser, result)
  }

  private _parseQuery(parser: ParseFunction, result: QueryResult): any {
    try {
      return parser(this, result)
    } catch (error) {
      throw new Error(`${error.message} The query results where:\n${
        JSON.stringify(result, null, 2)
      }`)
    }
  }

  private async _performQuery(query: DocumentNode, args: any =  {}): Promise<QueryResult> {
    const results = await this.#daoClient.query(
      query,
      args
    ).toPromise()

    if (results.error) {
      const queryStr = query.loc?.source.body
      const argsStr = JSON.stringify(args, null, 2)
      throw new Error(`Error performing query.\nArguments:${argsStr}\nQuery: ${queryStr}\nSubgraph:${this.#daoClient.url}`)
    }

    return results.data
  }
}

export default ConnectorTheGraph
