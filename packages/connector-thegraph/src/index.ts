import { ConnectorInterface, PermissionsType } from 'plumbery-core'
import fetch from 'node-fetch'
import { createClient } from '@urql/core'
import { QUERY_PERMISSIONS } from './queries'

class ConnectorTheGraph implements ConnectorInterface {
  #daoClient: any
  #appClient: any

  constructor({
    daoSubgraphUrl,
    appSubgraphUrl,
  }: {
    appSubgraphUrl: (repoId: string) => string
    daoSubgraphUrl: string
  }) {
    this.#daoClient = createClient({
      fetch: typeof window === 'undefined' ? fetch : window.fetch,
      maskTypename: true,
      url: daoSubgraphUrl,
    })
    // this.#appClient = createClient({ url: appSubgraphUrl('app_id') })
  }

  async permissions(orgAddress: string): Promise<PermissionsType> {
    return await this.#daoClient
      .query(QUERY_PERMISSIONS, { orgAddress })
      .toPromise()
      .then(res => {
        const { permissions } = res.data.organization.acl
        return permissions.map(({ app, entity, role }) => ({
          app: app?.address || null,
          entity,
          role: role.name,
        }))
      })
  }
}

export default ConnectorTheGraph
