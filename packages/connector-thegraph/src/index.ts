import 'isomorphic-unfetch';
import { Client } from '@urql/core'
import * as queries from './graphql/queries'
import { DocumentNode } from 'graphql';
import {
  OrganizationDataGql,
  AppDataGql
} from './graphql/types';
import {
  parseApp,
  parseApps,
  parsePermissions,
  parseRepo
} from './parse';
import {
  ConnectorInterface,
  Permission,
  App,
  Repo
} from 'plumbery-core'

export type ConnectorTheGraphConfig = {
  appSubgraphUrl: (repoId: string) => string
  daoSubgraphUrl: string
}

class ConnectorTheGraph implements ConnectorInterface {
  #daoClient: Client
  // #appClient: Client

  constructor({ daoSubgraphUrl, appSubgraphUrl }: ConnectorTheGraphConfig) {
    this.#daoClient = new Client({
      maskTypename: true,
      url: daoSubgraphUrl,
    })

    // this.#appClient = createClient({ url: appSubgraphUrl('app_id') })
  }

  async permissionsForOrg(orgAddress: string): Promise<Permission[]> {
    const org = (await this._performQuery(
      queries.ORGANIZATION_PERMISSIONS,
      { orgAddress }
    )).organization as OrganizationDataGql

    return parsePermissions(this, org?.acl?.permissions)
  }

  async appsForOrg(orgAddress: string): Promise<App[]> {
    const org = (await this._performQuery(
      queries.ORGANIZATION_APPS,
      { orgAddress }
    )).organization as OrganizationDataGql

    return parseApps(this, org?.apps)
  }

  async appByAddress(appAddress: string): Promise<App> {
    const app = (await this._performQuery(
      queries.APP_BY_ADDRESS,
      { appAddress }
    )).app as AppDataGql

    return parseApp(this, app)
  }

  async repoForApp(appAddress: string): Promise<Repo> {
    const app = (await this._performQuery(
      queries.REPO_BY_APP_ADDRESS,
      { appAddress }
    )).app as AppDataGql

    return parseRepo(this, app?.repo)
  }

  private async _performQuery(query: DocumentNode, vars: any =  {}): Promise<any> {
    const results = await this.#daoClient.query(
      query,
      vars
    ).toPromise()

    // TODO: Check for errors here.
    // console.log(JSON.stringify(results, null, 2))

    return results.data
  }
}

export default ConnectorTheGraph
