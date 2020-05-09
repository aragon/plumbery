import 'isomorphic-unfetch';
import { Client, maskTypename } from '@urql/core'
import * as queries from './graphql/queries'
import { DocumentNode } from 'graphql';
import {
  parseApp,
  parseApps,
  parsePermissions,
  parseRepo,
  parseRole
} from './parse';
import {
  ConnectorInterface,
  Permission,
  App,
  Repo,
  Role
} from 'plumbery-core'

type QueryResult = any
type DataGql = any

type ParseFunction = (connector: ConnectorTheGraph, data: DataGql) => {}

export type ConnectorTheGraphConfig = {
  appSubgraphUrls: { [appId: string]: string }
  daoSubgraphUrl: string
}

class ConnectorTheGraph implements ConnectorInterface {
  #daoClient: Client
  #appClients: { [appId: string]: Client }

  constructor({ daoSubgraphUrl, appSubgraphUrls }: ConnectorTheGraphConfig) {
    this.#daoClient = new Client({
      maskTypename: true,
      url: daoSubgraphUrl,
    })

    // this.#appClients = createClient({ url: appSubgraphUrl('app_id') })
    this.#appClients = {}
    for (const appId in appSubgraphUrls) {
      this.#appClients[appId] = new Client({
        maskTypename: true,
        url: appSubgraphUrls[appId]
      })
    }
  }

  async roleById(roleId: string): Promise<Role> {
    const result = await this._performQuery(
      queries.ROLE_BY_ID,
      { roleId }
    )

    return this._parseQuery(parseRole, result, result.role)
  }

  async permissionsForOrg(orgAddress: string): Promise<Permission[]> {
    const result = await this._performQuery(
      queries.ORGANIZATION_PERMISSIONS,
      { orgAddress }
    )

    return this._parseQuery(parsePermissions, result, result.organization?.permissions)
  }

  async appsForOrg(orgAddress: string): Promise<App[]> {
    const result = await this._performQuery(
      queries.ORGANIZATION_APPS,
      { orgAddress }
    )

    return this._parseQuery(parseApps, result, result.organization?.apps)
  }

  async appByAddress(appAddress: string): Promise<App> {
    const result = await this._performQuery(
      queries.APP_BY_ADDRESS,
      { appAddress }
    )

    return this._parseQuery(parseApp, result, result.app)
  }

  async repoForApp(appAddress: string): Promise<Repo> {
    const result = await this._performQuery(
      queries.REPO_BY_APP_ADDRESS,
      { appAddress }
    )

    return this._parseQuery(parseRepo, result, result.app?.repoVersion?.repo)
  }

  private _parseQuery(parser: ParseFunction, result: QueryResult, data: DataGql): any {
    try {
      return parser(this, data)
    } catch (error) {
      throw new Error(`${error.message} The query results where:\n${
        JSON.stringify(result, null, 2)
      }`)
    }
  }

  private async _performQuery(query: DocumentNode, vars: any =  {}): Promise<QueryResult> {
    const results = await this.#daoClient.query(
      query,
      vars
    ).toPromise()

    if (results.error) {
      const queryStr = query.loc?.source.body
      throw new Error(`Error while connecting to the subgraph at ${this.#daoClient.url} with query: ${queryStr}\n Error: ${results.error}`)
    }

    return results.data
  }
}

export default ConnectorTheGraph
