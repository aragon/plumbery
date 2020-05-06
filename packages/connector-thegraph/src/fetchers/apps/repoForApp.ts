import { Repo, ConnectorTheGraph } from 'plumbery-core'
import { AppDataGql } from '../../graph-types'
import { Client } from '@urql/core'

export default async function fetchRepoForApp(
  appAddress: string,
  client: Client,
  connector: ConnectorTheGraph
): Promise<Repo> {
  const query = `
    query {
      apps(where: {
        address: "${appAddress}"
      }) {
        repo {
          address
          name
          lastVersion {
            semanticVersion
          }
        }
      }
    }
  `

  const results = await client.query(query).toPromise()
  const app = results.data.apps[0] as AppDataGql

  if (!app.repo) {
    throw new Error(`No repo found for app ${appAddress}`)
  }

  return new Repo({
    name: app.repo.name,
    address: app.repo.address
  }, connector)
}
