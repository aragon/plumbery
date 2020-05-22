import {
  ConnectorInterface,
  Permission,
  PermissionData,
  App,
  AppData,
  Repo,
  Role,
  RoleData,
} from '@aragon/connect'
import * as queries from './queries'
import GraphQLWrapper from './core/GraphQLWrapper'
import {
  parseApp,
  parseApps,
  parsePermissions,
  parseRepo,
  parseRoles,
} from './parsers'

export type ConnectorTheGraphConfig = {
  daoSubgraphUrl: string
  verbose?: boolean
}

export default class ConnectorTheGraph extends GraphQLWrapper
  implements ConnectorInterface {
  constructor(config: ConnectorTheGraphConfig) {
    super(config.daoSubgraphUrl, config.verbose)
  }

  async rolesForAddress(appAddress: string): Promise<Role[]> {
    const result = await this.performQuery(queries.ROLE_BY_APP_ADDRESS, {
      appAddress,
    })

    const datas = this.parseQueryResult(parseRoles, result)

    return datas.map((data: RoleData) => {
      return new Role(data, this)
    })
  }

  async permissionsForOrg(orgAddress: string): Promise<Permission[]> {
    const result = await this.performQuery(queries.ORGANIZATION_PERMISSIONS, {
      orgAddress,
    })

    const datas = this.parseQueryResult(parsePermissions, result)

    return datas.map((data: PermissionData) => {
      return new Permission(data, this)
    })
  }

  async appsForOrg(orgAddress: string): Promise<App[]> {
    const result = await this.performQuery(queries.ORGANIZATION_APPS, {
      orgAddress,
    })

    const datas = this.parseQueryResult(parseApps, result)

    return datas.map((data: AppData) => {
      return new App(data, this)
    })
  }

  async appByAddress(appAddress: string): Promise<App> {
    const result = await this.performQuery(queries.APP_BY_ADDRESS, {
      appAddress,
    })

    const data = this.parseQueryResult(parseApp, result)

    return new App(data, this)
  }

  async repoForApp(appAddress: string): Promise<Repo> {
    const result = await this.performQuery(queries.REPO_BY_APP_ADDRESS, {
      appAddress,
    })

    const data = this.parseQueryResult(parseRepo, result)

    return new Repo(data, this)
  }
}
