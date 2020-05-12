import 'isomorphic-unfetch';
import { Client } from '@urql/core'
import { DocumentNode } from 'graphql';
import { ConnectorInterface } from 'plumbery-core'
import { Module, ParseFunction, QueryResult } from './types';

export type ConnectorTheGraphConfig = {
  modules: {
    [moduleName: string]: {
      subgraphUrl: string
    }
  }
}

class ConnectorTheGraph implements ConnectorInterface {
  #modules: {
    [moduleName: string]: Module
  }

  constructor(config: ConnectorTheGraphConfig) {
    if (!config.modules.org) {
      throw new Error('Must specify an org module.')
    }

    this.#modules = {}

    for (const moduleName in config.modules) {
      const module = config.modules[moduleName]

      this.loadModule(moduleName, module.subgraphUrl)
    }
  }

  loadModule(moduleName: string, subgraphUrl: string): void {
    console.log(`LOADING MODULE: ${moduleName}`)

    if (this.#modules[moduleName]) {
      throw new Error(`Module ${moduleName} already loaded.`)
    }

    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const module = require(`./modules/${moduleName}`).default

    module.client = new Client({
      maskTypename: true,
      url: subgraphUrl
    })

    this.#modules[moduleName] = module
  }

  async execute(moduleName: string, selectorName: string, args: any = {}): Promise<any> {
    const module = this.#modules[moduleName]
    if (!module) {
      throw new Error(`Invalid module "${moduleName}".`)
    }

    const client = module.client
    if (!client) {
      throw new Error(`Client not set on module "${moduleName}".`)
    }

    const selector = module.selectors[selectorName]

    const result = await this._performQuery(
      client,
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

  private async _performQuery(client: Client, query: DocumentNode, args: any =  {}): Promise<QueryResult> {
    const results = await client.query(
      query,
      args
    ).toPromise()

    if (results.error) {
      const queryStr = query.loc?.source.body
      const argsStr = JSON.stringify(args, null, 2)
      throw new Error(`Error performing query.\nArguments:${argsStr}\nQuery: ${queryStr}\nSubgraph:${client.url}`)
    }

    return results.data
  }
}

export default ConnectorTheGraph
