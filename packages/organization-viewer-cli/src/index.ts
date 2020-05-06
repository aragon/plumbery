import data from './org-data.json'
import {
  aragonConnect,
  Permission,
  App
} from 'plumbery-core'

const ORG_ADDRESS = '0x0146414e5a819240963450332f647dfb7c722af4'

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
          'https://api.thegraph.com/subgraphs/name/0xgabi/dao-subgraph-rinkeby',
        appSubgraphUrl: () => '',
      },
    ],
    signer: {},
  })

  // Connect to the organization and collect data.
  const org = connection.organization(ORG_ADDRESS)
  const permissions = await org.permissions()
  const apps = await org.apps()

  // Display the information.
  tracePermissions(permissions)
  traceApps(apps)
}

function traceApps(apps: App[]): void {
  console.log('\nApps:')
  apps.map(app => {
    console.log(`  Name: ${app.name || ''}`)
    console.log(`  address: ${app.address}`)
    console.log('')
  })
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
