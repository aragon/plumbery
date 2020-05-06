import { aragonConnect, Permission } from 'plumbery-core'
import data from './org-data.json'

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

  // Display the information.
  tracePermissions(permissions)
}

function tracePermissions(permissions: Permission[]): void {
  permissions.map(({ app, role, entity }) => {
    console.log(`\nEntity (who): ${entity}`)
    console.log(`App (where): ${app || ''}`)
    console.log(`Role (what): ${role}`)
  })
}

main()
  .then(() => process.exit(0))
  .catch(err => {
    console.log(`err`, err)
    process.exit(1)
  })
