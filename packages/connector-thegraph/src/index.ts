import 'isomorphic-unfetch';
import { Client } from '@urql/core'
import * as queries from './graphql/queries'
import { DocumentNode } from 'graphql';
import {
  Organization as OrganizationDataGql,
  App as AppDataGql,
  Role as RoleDataGql
} from './graphql/types';
import {
  ParseAppFromApp,
  ParseAppsFromOrg,
  ParsePermissionsFromPermissions,
  ParseRepoFromApp,
  ParseRoleFromRole
} from './parse';
import {
  ConnectorInterface,
  Permission,
  App,
  Repo,
  Role
} from 'plumbery-core'

export type ConnectorTheGraphConfig = {
  daoSubgraphUrl: string
  appSubgraphUrls: { [appName: string]: string }
}

class ConnectorTheGraph implements ConnectorInterface {
  #daoClient: Client
  #appClients: { [appName: string]: Client } = {}

  constructor({ daoSubgraphUrl, appSubgraphUrls }: ConnectorTheGraphConfig) {
    this.#daoClient = new Client({
      maskTypename: true,
      url: daoSubgraphUrl,
    })

    const appNames = Object.keys(appSubgraphUrls)
    console.log('appNames:', appNames)
  }

  async roleById(roleId: string): Promise<Role> {
    const res = await this._performQuery(queries.ROLE_BY_ID, { roleId })
    const role = res.role as RoleDataGql

    return new ParseRoleFromRole().parse(this, role, role)
  }

  async permissionsForOrg(orgAddress: string): Promise<Permission[]> {
    const res = await this._performQuery(queries.ORGANIZATION_PERMISSIONS, { orgAddress })
    const org = res.organization as OrganizationDataGql

    return new ParsePermissionsFromPermissions().parse(this, org, org.permissions)
  }

  async appsForOrg(orgAddress: string): Promise<App[]> {
    const res = await this._performQuery(queries.ORGANIZATION_APPS, { orgAddress })
    const org = res.organization as OrganizationDataGql

    return new ParseAppsFromOrg().parse(this, org, org?.apps)
  }

  async appByAddress(appAddress: string): Promise<App> {
    const res = await this._performQuery(queries.APP_BY_ADDRESS, { appAddress })
    const app = res.app as AppDataGql

    return new ParseAppFromApp().parse(this, app, app)
  }

  async repoForApp(appAddress: string): Promise<Repo> {
    const res = await this._performQuery(queries.REPO_BY_APP_ADDRESS, { appAddress })
    const app = res.app as AppDataGql

    return new ParseRepoFromApp().parse(this, app, app?.repoVersion?.repo)
  }

  private async _performQuery(query: DocumentNode, vars: any =  {}): Promise<any> {
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
