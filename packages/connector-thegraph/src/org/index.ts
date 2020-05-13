import * as queries from './graphql/queries'
import GraphQLWrapper from '../core/GraphQLWrapper'
import {
  parseApp,
  parseApps,
  parsePermissions,
  parseRepo,
  parseRole
} from './parse';
import {
  ConnectorInterface,
  Permission, PermissionData,
  App, AppData,
  Repo,
  Role
} from 'plumbery-core'

export type ConnectorTheGraphConfig = {
  daoSubgraphUrl: string
}

export default class ConnectorTheGraph extends GraphQLWrapper implements ConnectorInterface {
  constructor(config: ConnectorTheGraphConfig) {
    super(config.daoSubgraphUrl)
  }

  async roleById(roleId: string): Promise<Role> {
    const result = await this._performQuery(
      queries.ROLE_BY_ID,
      { roleId }
    )

    const data = this._parseQuery(parseRole, result, result.role)

    return new Role(data, this)
  }

  async permissionsForOrg(orgAddress: string): Promise<Permission[]> {
    const result = await this._performQuery(
      queries.ORGANIZATION_PERMISSIONS,
      { orgAddress }
    )

    const datas = this._parseQuery(parsePermissions, result, result.organization?.permissions)

    return datas.map((data: PermissionData) => {
      return new Permission(data, this)
    })
  }

  async appsForOrg(orgAddress: string): Promise<App[]> {
    const result = await this._performQuery(
      queries.ORGANIZATION_APPS,
      { orgAddress }
    )

    const datas = this._parseQuery(parseApps, result, result.organization?.apps)

    return datas.map((data: AppData) => {
      return new App(data, this)
    })
  }

  async appByAddress(appAddress: string): Promise<App> {
    const result = await this._performQuery(
      queries.APP_BY_ADDRESS,
      { appAddress }
    )

    const data = this._parseQuery(parseApp, result, result.app)

    return new App(data, this)
  }

  async repoForApp(appAddress: string): Promise<Repo> {
    const result = await this._performQuery(
      queries.REPO_BY_APP_ADDRESS,
      { appAddress }
    )

    const data = this._parseQuery(parseRepo, result, result.app?.repoVersion?.repo)

    return new Repo(data, this)
  }
}
