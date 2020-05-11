// import data from './org-data.json'
import {
  aragonConnect,
  Permission,
  App
} from 'plumbery-core'
import Connection from 'plumbery-core/dist/Connection'

const ORG_ADDRESS = '0x00e45b9918297037fe6585c2a1e53e8801f562f4'

let app

async function main() {
  const connection = initConnection()
  const org = connection.organization(ORG_ADDRESS)

  console.log('\nPermissions:')
  const permissions = await org.permissions()
  permissions.map((permission: Permission) => console.log(permission.toString()))

  console.log('\nApps:')
  const apps = await org.apps()
  apps.map((app: App) => console.log(app.toString()))

  console.log('\nA voting app:')
  app = apps.find((app: App) => app.name == 'voting')!
  console.log(app.toString())

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
  const role = await permissions[1].getRole()
  console.log(role.toString())
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
