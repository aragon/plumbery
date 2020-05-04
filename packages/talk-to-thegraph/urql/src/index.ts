import 'isomorphic-unfetch';
import { Client } from '@urql/core'
import { pipe, subscribe } from 'wonka'

// const GRAPH_URL = 'https://api.thegraph.com/subgraphs/name/0xgabi/dao-subgraph'
const GRAPH_URL = 'https://api.thegraph.com/subgraphs/name/0xgabi/dao-subgraph-rinkeby'

// const ORG_ADDRESS = '0x022fd42a494e0f9e00960d1becc5a1bbed4b528a' // mainnet
// const ORG_ADDRESS = '0x9CBc580796F549510D4D91F117555A4964296884' // rinkeby, 'aletalkstothegraph'
// const ORG_ADDRESS = '0x059bCFBC477C46AB39D76c05B7b40f3A42e7DE3B' // rinkeby, 'aleisstilltalkingtothegraph'
const ORG_ADDRESS = '0xd0a36F6441678140bbA1fB8Cba3d75cB87dbe60b'

let client

async function main(): Promise<void> {
  client = new Client({
    url: GRAPH_URL
  })

  await testOneTimeCall()

  await testStreamedCall()

  // Keep the program running.
  await new Promise(resolve => {
    setTimeout(() => {
      resolve()
    }, 1000000000)
  })
}

async function testOneTimeCall(): Promise<void> {
  const query = `
    query {
        organizations(where: {
            address: "${ORG_ADDRESS}"
        }) {
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

  // This is just to test caching:
  // (1) No data before a query was made.
  let cached = client.readQuery(query)
  console.log(`cached (before):`, cached)

  // Perform the query.
  const result = await client.query(query).toPromise()
  const data = result.data.organizations
  console.log(JSON.stringify(data, null, 2))

  // (2) The data is cached and can now be
  // retrieved synchronously.
  cached = client.readQuery(query)
  console.log(`cached (after):`, cached.data.organizations)
}

async function testStreamedCall(): Promise<void> {
  const query = `
    query {
      organizations {
        address
      }
    }
  `

  const { unsubscribe } = pipe(
    client.query(query),
    subscribe((result: any) => {
      const data = result.data.organizations
      console.log(JSON.stringify(data, null, 2))
    })
  )
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.log(error)
    process.exit(1)
  })