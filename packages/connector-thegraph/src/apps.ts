import { App } from 'plumbery-core'
import { OrganizationDataGql, AppDataGql } from './graph-types'
import { Client } from '@urql/core'
import { AppData } from 'plumbery-core/dist/wrappers/App'

export default async function fetchApps(
  orgAddress: string,
  client: Client
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
    const data: AppData = {
      name: appData.repo?.name,
      address: appData.address
    }

    return new App(data)
  })
}
