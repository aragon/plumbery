import gql from 'graphql-tag'
import { ConnectorInterface, PermissionsType } from 'plumbery-core'
import { createClient } from '@urql/core'
import fetch from '@brillout/fetch'

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
    this.#daoClient = createClient({ url: daoSubgraphUrl, fetch })
    // this.#appClient = createClient({ url: appSubgraphUrl('app_id') })
  }

  async permissions(orgAddress: string): Promise<PermissionsType> {
    return [
      await this.#daoClient
        .query(
          gql`
            query Organization($id: ID!) {
              organization(id: $id) {
                acl {
                  permissions {
                    role {
                      name
                    }
                    entity
                  }
                }
              }
            }
          `,
          {
            id: orgAddress,
          }
        )
        .toPromise()
        .then(res => res.data.organization.acl.permissions),
    ]
  }
}

export default ConnectorTheGraph
