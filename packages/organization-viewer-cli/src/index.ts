// import data from './org-data.json'
import {
  aragonConnect,
  Permission,
  App
} from 'plumbery-core'
import Connection from 'plumbery-core/dist/Connection'

const DAO_SUBGRAPH_URL = 'https://api.thegraph.com/subgraphs/name/0xgabi/dao-subgraph-rinkeby'
const VOTING_SUBGRAPH_URL = 'https://api.thegraph.com/subgraphs/name/ajsantander/voting-subgraph'
const ORG_ADDRESS = '0x00e45b9918297037fe6585c2a1e53e8801f562f4'

async function main() {
  let app

  const connection = initConnection()

  const org = connection.organization(ORG_ADDRESS)

  // Retrieve all the permissions of an org.
  const permissions = await org.permissions()
  console.log(`\nPermissions:\n${permissions.map(
    (p: Permission) => p.describe()
  ).join('\n')}`)

  // Retrieve all the apps of an org.
  const apps = await org.apps()
  console.log(`\nApps:\n${apps.map(
    (app: App) => app.describe()
  ).join('\n')}`)

  // Find a voting app.
  app = apps[0]
  // app = apps.find((app: App) => app.name == 'voting')!
  console.log(`\nA voting app:\n${app.describe()}`)

  // Retrieve a repo from an app.
  const repo = await app.repo()
  console.log(`\nRepo:\n${repo.describe()}`)

  // Retrieve an app by address.
  app = await org.app(apps[1].address)
  console.log(`\nApp by address:\n${app.describe()}`)

  // Retrieve an app from a permission.
  app = await permissions[1].getApp()
  if (app) {
    console.log(`\nApp from permission:\n${app.describe()}`)
  }

  // Retrieve a role from a permission.
  const role = await permissions[1].getRole()
  console.log(`\nRole from permission:\n${role.describe()}`)
}

function initConnection(): Connection {
  // return aragonConnect({
  //   connector: ['json', { data }],
  //   signer: {},
  // })

  return aragonConnect({
    connector: [
      'thegraph',
      {
        daoSubgraphUrl: DAO_SUBGRAPH_URL,
        appSubgraphUrls: (repoId: string) => {
          if (repoId == 'voting') {
            return VOTING_SUBGRAPH_URL
          } else {
            throw new Error('Unknown subgraph.')
          }
        },
      },
    ],
    signer: {},
  })
}

main()
  .then(() => process.exit(0))
  .catch(err => {
    console.log(`err`, err)
    process.exit(1)
  })
