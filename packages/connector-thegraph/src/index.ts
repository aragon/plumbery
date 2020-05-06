import 'isomorphic-unfetch';
import { Client } from '@urql/core'
import {
  ConnectorInterface,
  Permission,
  App,
  Repo
} from 'plumbery-core'
import fetchPermissionsForOrg from './fetchers/orgs/permissionsForOrg'
import fetchAppsForOrg from './fetchers/orgs/appsForOrg';
import fetchRepoForApp from './fetchers/apps/repoForApp';
import fetchAppByAddress from './fetchers/apps/appByAddress';

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
    return await fetchPermissionsForOrg(orgAddress, this.#daoClient, this)
  }

  async appsForOrg(orgAddress: string): Promise<App[]> {
    return await fetchAppsForOrg(orgAddress, this.#daoClient, this)
  }

  async appByAddress(appAdress: string): Promise<App> {
    return await fetchAppByAddress(appAdress, this.#daoClient, this)
  }

  async repoForApp(appAddress: string): Promise<Repo> {
    return await fetchRepoForApp(appAddress, this.#daoClient, this)
  }
}

export default ConnectorTheGraph
