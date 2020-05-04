import 'isomorphic-unfetch';
import { Client } from '@urql/core'

const GRAPH_URL = 'https://api.thegraph.com/subgraphs/name/0xgabi/dao-subgraph'

const ORG_ADDRESS = '0x022fd42a494e0f9e00960d1becc5a1bbed4b528a' // mainnet

async function main(): Promise<void> {
  const client = new Client({
    url: GRAPH_URL
  })

  const query = `
    query {
        organizations(where: {
            address: "${ORG_ADDRESS}"
        }) {
            apps {
                address
                appId
                repo {
                    address
                    name
                }
            }
        }
    }
  `

  const result = await client.query(query).toPromise()
  const data = result.data.organizations[0]
  console.log(JSON.stringify(data, null, 2))
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.log(error)
    process.exit(1)
  })