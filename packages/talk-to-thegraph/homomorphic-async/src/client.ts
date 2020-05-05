import 'isomorphic-unfetch';
import { Client as UrqlClient } from '@urql/core'
import { OrganizationData } from "./graph-types";
import { Organization } from "./Organization";

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
        }
      }
    `

    const result = await this.query(query)
    const orgData = result.data.organizations[0] as OrganizationData

    return new Organization(orgData, this)
  }

  public async query(query: string): Promise<any> {
    return await this._client.query(query).toPromise()
  }
}