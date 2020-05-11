// import data from './org-data.json'
import gql from 'graphql-tag'
import {
  aragonConnect,
  Permission,
  App
} from 'plumbery-core'
import Connection from 'plumbery-core/dist/Connection'

const DAO_SUBGRAPH_URL = 'https://api.thegraph.com/subgraphs/name/0xgabi/dao-subgraph-rinkeby'
const VOTING_SUBGRAPH_URL = 'https://api.thegraph.com/subgraphs/name/ajsantander/voting-subgraph'
const ORG_ADDRESS = '0x00e45b9918297037fe6585c2a1e53e8801f562f4'

let app: App

async function main() {
  const connection = initConnection()
  const org = connection.organization(ORG_ADDRESS)

  console.log('\nPermissions:')
  const permissions = await org.permissions()
  permissions.map((permission: Permission) => console.log(permission.toString()))

  console.log('\nApps:')
  const apps = await org.apps()
  apps.map((app: App) => console.log(app.toString()))

  console.log('\nA repo from an app:')
  const repo = await app.repo()
  console.log(repo.toString())

  console.log('\nAn app by address:')
  app = await org.app(apps[1].address)
  console.log(app.toString())

  console.log('\nAn app from a permission:')
  app = await permissions[1].getApp()
  if (app) { console.log(app.toString()) }

  console.log('\nA role from a permission:')
  const role = await permissions[2].getRole()
  console.log(role.toString())

  console.log('\nA voting app:')
  const voting = apps.find((app: App) => app.name == 'voting')
  const votes = await voting!.getState('votes')
  console.log(votes)
}

const votingAppSelectors = {
  votes: {
    query: gql`
      query {
        votes {
          id
          creator
          metadata
          executed
        }
      }
    `,
    parser: (data: any) => {
      return data
    }
  }
}

function initConnection(): Connection {
  return aragonConnect({
    connector: [
      'thegraph',
      {
        daoSubgraphUrl: DAO_SUBGRAPH_URL,
        appConnectors: {
          voting: {
            subgraphUrl: VOTING_SUBGRAPH_URL,
            selectors: votingAppSelectors
          }
        }
      },
    ],
    signer: {},
  })

  // JSON connector.
  // return aragonConnect({
  //   connector: ['json', { data }],
  //   signer: {},
  // })
}

main()
  .then(() => process.exit(0))
  .catch(err => {
    console.log(`err`, err)
    process.exit(1)
  })
