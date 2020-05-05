import { aragonConnect } from 'plumbery-core'

const ORG_ADDRESS = '0x0146414e5a819240963450332f647dfb7c722af4'

async function main() {
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

  // Get an Organization instance
  const org = connection.organization(ORG_ADDRESS)

  // Get the permissions set on the organization
  const permissions = await org.permissions()

  displayPermissions(permissions, ORG_ADDRESS)
}

function displayPermissions(permissions, orgAddress) {
  const pre = document.body.appendChild(document.createElement('pre'))
  pre.innerHTML = [
    `Permissions for ${orgAddress}:`,
    formatPermissions(permissions),
  ].join('\n')
}

function formatPermissions(permissions) {
  return permissions
    .map(({ app, role, entity }) => {
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
