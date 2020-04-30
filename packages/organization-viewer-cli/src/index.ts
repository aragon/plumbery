import { aragonConnect } from 'plumbery-core'
import data from './org-data.json'

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
        // 'wss://api.thegraph.com/subgraphs/name/0xgabi/dao-subgraph-rinkeby',
        appSubgraphUrl: () => '',
      },
    ],
    signer: {},
  })

  // Get an Organization instance
  const org = connection.organization(
    '0x0146414e5a819240963450332f647dfb7c722af4'
  )

  // Get the permissions set on the organization
  const permissions = await org.permissions()

  logPermissions(permissions)
}

function logPermissions(permissions) {
  console.log('')
  console.log('Permissions')
  console.log('===========')

  // for (const [app, roles] of permissions) {
  //   console.log('')
  //   console.log(`${app}:`)
  //   for (const [role, entities] of roles) {
  //     console.log(`  ${role}:`, entities.join(', '))
  //   }
  // }
}

main()
