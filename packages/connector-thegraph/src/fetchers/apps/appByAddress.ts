import { App, ConnectorTheGraph } from 'plumbery-core'
import { AppDataGql } from '../../graph-types'
import { Client } from '@urql/core'

export default async function fetchAppByAddress(
  appAddress: string,
  client: Client,
  connector: ConnectorTheGraph
): Promise<App> {
  const query = `
    query {
      app(id: "${appAddress}") {
        address
        repo {
          name
        }
      }
    }
  `

  const results = await client.query(query).toPromise()
  const app = results.data.app as AppDataGql

  return new App({
    name: app.repo?.name,
    address: app.address
  }, connector)
}
