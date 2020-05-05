import { ConnectorInterface, PermissionsType } from 'plumbery-core'
import fetch from 'node-fetch'
import { createClient } from '@urql/core'
import { QUERY_PERMISSIONS } from './queries'

declare global {
  interface Window {
    fetch: any
  }
}

export type ConnectorTheGraphConfig = {
  appSubgraphUrl: (repoId: string) => string
  daoSubgraphUrl: string
}

class ConnectorTheGraph implements ConnectorInterface {
  #daoClient: any
  #appClient: any

  constructor({ daoSubgraphUrl, appSubgraphUrl }: ConnectorTheGraphConfig) {
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
      .then((res: any) => {
        const { permissions } = res?.data?.organization?.acl
        if (!permissions) {
          return []
        }
        return permissions.map(
          ({
            app,
            entity,
            role,
          }: {
            app: any
            entity: string
            role: { name: string }
          }) => ({
            app: app?.address || '',
            entity,
            role: role.name,
          })
        )
      })
  }
}

export default ConnectorTheGraph
