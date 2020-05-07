// import data from './org-data.json'
import {
  aragonConnect,
  Permission,
  App
} from 'plumbery-core'
import Connection from 'plumbery-core/dist/Connection'

const ORG_ADDRESS = '0x00018d22ece8b2ea4e9317b93f7dff67385693d8'

async function main() {
  const connection = initConnection()

  const org = connection.organization(ORG_ADDRESS)

  const permissions = await org.permissions()
  console.log(`\nPermissions:\n${permissions.map(
    (p: Permission) => p.describe()
  ).join('\n')}`)

  const apps = await org.apps()
  console.log(`\nApps:\n${apps.map(
    (app: App) => app.describe()
  ).join('\n')}`)

  const app = apps[0]
  console.log(`\nFirst app:\n${app.describe()}`)

  const repo = await app.repo()
  console.log(`\nRepo:\n${repo.describe()}`)

  const someApp = await org.app(apps[1].address)
  console.log(`\nSome app:\n${app.describe()}`)
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
        daoSubgraphUrl:
          'https://api.thegraph.com/subgraphs/name/0xgabi/dao-subgraph-rinkeby',
        appSubgraphUrl: () => '',
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
