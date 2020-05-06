import { ConnectorInterface, Permission } from 'plumbery-core'
import { Client } from '@urql/core'
import 'isomorphic-unfetch';
// import { QUERY_PERMISSIONS } from './queries'

export type ConnectorTheGraphConfig = {
  appSubgraphUrl: (repoId: string) => string
  daoSubgraphUrl: string
}

class ConnectorTheGraph implements ConnectorInterface {
  #daoClient: any
  #appClient: any

  constructor({ daoSubgraphUrl, appSubgraphUrl }: ConnectorTheGraphConfig) {
    this.#daoClient = new Client({
      maskTypename: true,
      url: daoSubgraphUrl,
    })

    // this.#appClient = createClient({ url: appSubgraphUrl('app_id') })
  }

  async permissions(orgAddress: string): Promise<Permission[]> {
    const query = `
      query {
        organization(id: "${orgAddress}") {
          acl {
            permissions {
              entity
              app {
                address
              }
              role {
                name
                manager
              }
            }
          }
        }
      }
    `

    const res = await this.#daoClient.query(query).toPromise()

    const { permissions } = res?.data?.organization.acl
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
  }
}

export default ConnectorTheGraph
