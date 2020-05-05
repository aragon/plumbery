import 'isomorphic-unfetch';
import { Client as UrqlClient } from '@urql/core'
import { Organization } from "./graph-types";

export default class Client {
  private _client: UrqlClient

  constructor() {
    this._client = new UrqlClient({
      url: 'https://api.thegraph.com/subgraphs/name/0xgabi/dao-subgraph-rinkeby'
    })
  }

  public async getOrganization(orgAddress: string): Promise<Organization> {
    const query = `
      query {
        organizations(where: {
          address: "${orgAddress}"
        }) {
        id
        address
        acl {
            id
            address
            permissions {
                id
                app {
                    address
                }
                role {
                    id
                    name
                    manager
                    allowedEntities {
                        id
                        app {
                            address
                        }
                        role {
                            id
                        }
                        entity
                        allowed
                    }
                }
                entity
                allowed
            }
        }
        recoveryVault
        apps {
            id
            address
            appId
            repo {
                address
                name
            }
        }
        factory {
            id
            orgCount
        }
        }
      }
    `

    const result = await this._query(query)
    return result.data.organizations[0] as Organization
  }

  private async _query(query: string): Promise<any> {
    return await this._client.query(query).toPromise()
  }
}