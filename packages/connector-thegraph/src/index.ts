import 'isomorphic-unfetch';
import fetchPermissions from './permissions'
import { ConnectorInterface, Permission } from 'plumbery-core'
import { Client } from '@urql/core'

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

  public async permissions(orgAddress: string): Promise<Permission[]> {
    return await fetchPermissions(orgAddress, this.#daoClient)
  }
}

export default ConnectorTheGraph
