import { aragonConnect, Permission } from 'plumbery-core'
import data from './org-data.json'

const ORG_ADDRESS = '0x0146414e5a819240963450332f647dfb7c722af4'

async function main() {
  console.log(`DEMO`)

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
  const org = connection.organization(ORG_ADDRESS)

  // Get the permissions set on the organization
  const permissions = await org.permissions()

  displayPermissions(permissions, ORG_ADDRESS)
}

function displayPermissions(permissions: Permission[], orgAddress: string) {
  console.log(`Permissions for ${orgAddress}:`)
  console.log(formatPermissions(permissions))
}

function formatPermissions(permissions: Permission[]) {
  return permissions
    .map(({ app, role, entity }: Permission) => {
      return [
        '',
        `App: ${(app || '').padEnd(42, ' ')}`,
        `Role: ${role.padEnd(66, ' ')}`,
        `Entity: ${entity.padEnd(42, ' ')}`,
      ].join('\n')
    })
    .join('\n')
}

main()
  .then(process.exit(0))
