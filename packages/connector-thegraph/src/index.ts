import 'isomorphic-unfetch';
import { Client } from '@urql/core'
import {
  ConnectorInterface,
  Permission,
  App
} from 'plumbery-core'
import fetchPermissions from './permissions'
import fetchApps from './apps';

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

  async permissions(orgAddress: string): Promise<Permission[]> {
    return await fetchPermissions(orgAddress, this.#daoClient)
  }

  async apps(orgAddress: string): Promise<App[]> {
    return await fetchApps(orgAddress, this.#daoClient)
  }
}

export default ConnectorTheGraph
