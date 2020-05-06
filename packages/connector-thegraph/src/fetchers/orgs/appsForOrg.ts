import { App, ConnectorTheGraph } from 'plumbery-core'
import { OrganizationDataGql, AppDataGql } from '../../graph-types'
import { Client } from '@urql/core'

export default async function fetchAppsForOrg(
  orgAddress: string,
  client: Client,
  connector: ConnectorTheGraph
): Promise<App[]> {
  const query = `
    query {
      organization(id: "${orgAddress}") {
        apps {
          address
          appId
          repo {
            name
            address
          }
        }
      }
    }
  `

  const results = await client.query(query).toPromise()
  const org = results.data.organization as OrganizationDataGql

  if (!org.apps) {
    return []
  }

  return org.apps.map((appData: AppDataGql) => {
    return new App({
      name: appData.repo?.name,
      address: appData.address
    }, connector)
  })
}
