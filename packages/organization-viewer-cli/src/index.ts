import data from './org-data.json'
import {
  aragonConnect,
  Permission,
  App,
  Repo
} from 'plumbery-core'

const ORG_ADDRESS = '0x022fd42a494e0f9e00960d1becc5a1bbed4b528a'

async function main() {
  // Initiate the connection
  // const connection = aragonConnect({
  //   connector: ['json', { data }],
  //   signer: {},
  // })
  const connection = aragonConnect({
    connector: [
      'thegraph',
      {
        daoSubgraphUrl:
          'https://api.thegraph.com/subgraphs/name/0xgabi/dao-subgraph',
        appSubgraphUrl: () => '',
      },
    ],
    signer: {},
  })

  const org = connection.organization(ORG_ADDRESS)

  const permissions = await org.permissions()
  tracePermissions(permissions)

  const apps = await org.apps()
  traceApps(apps)

  const app = apps[0]
  const repo = await app.repo()
  traceApp(app)
  traceRepo(repo)

  const someApp = await org.app(apps[1].address)
  traceApp(someApp)
}

function traceRepo(repo: Repo): void {
  console.log('\nRepo:')
  console.log(`  Name: ${repo.name || ''}`)
  console.log(`  address: ${repo.address}`)
  console.log('')
}

function traceApps(apps: App[]): void {
  console.log('\nApps:')
  apps.map(app => traceApp(app))
}

function traceApp(app: App): void {
  console.log('\nApp:')
  console.log(`  Name: ${app.name || ''}`)
  console.log(`  address: ${app.address}`)
  console.log('')
}

function tracePermissions(permissions: Permission[]): void {
  console.log('\nPermissions:')
  permissions.map((permission) => {
    console.log(`  Entity (who): ${permission.entity}`)
    console.log(`  App (where): ${permission.app || ''}`)
    console.log(`  Role (what): ${permission.role}`)
    console.log('')
  })
}

main()
  .then(() => process.exit(0))
  .catch(err => {
    console.log(`err`, err)
    process.exit(1)
  })
