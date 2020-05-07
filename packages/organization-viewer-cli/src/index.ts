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
  console.log(`\nPermissions:\n${permissions.map((p: Permission) => p.describe()).join('\n')}`)

  const apps = await org.apps()
  console.log(`\nApps:\n${apps.map((app: App) => app.describe()).join('\n')}`)

  const app = apps[0]
  console.log(`\nFirst app:\n${app.describe()}`)

  const repo = await app.repo()
  console.log(`\nRepo:\n${repo.describe()}`)

  const someApp = await org.app(apps[1].address)
  console.log(`\nSome app:\n${app.describe()}`)
}

main()
  .then(() => process.exit(0))
  .catch(err => {
    console.log(`err`, err)
    process.exit(1)
  })
