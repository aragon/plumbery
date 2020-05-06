import { Repo, ConnectorTheGraph } from 'plumbery-core'
import { RepoDataGql } from '../../graph-types'
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
  const repo = results.data.repo as RepoDataGql

  return new Repo({
    name: repo.name,
    address: repo.address
  }, connector)
}
