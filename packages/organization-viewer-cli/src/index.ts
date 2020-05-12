// import data from './org-data.json'
import {
  aragonConnect,
  Permission,
  App,
  Voting
} from 'plumbery-core'
import Connection from 'plumbery-core/dist/Connection'

const ORG_ADDRESS = '0x00e45b9918297037fe6585c2a1e53e8801f562f4'

async function main() {
  const connection = initConnection()

  // await readOrg(connection)
  await readVoting(connection)
}

async function readOrg(connection: Connection): Promise<void> {
  const org = connection.organization(ORG_ADDRESS)

  console.log('\nPermissions:')
  const permissions = await org.permissions()
  permissions.map((permission: Permission) => console.log(permission.toString()))

  console.log('\nA role from a permission:')
  const role = await permissions[0].getRole()
  console.log(role.toString())

  console.log('\nApps:')
  const apps = await org.apps()
  apps.map((app: App) => console.log(app.toString()))

  console.log('\nA voting app:')
  const votingApp = apps.find((app: App) => app.name == 'voting')!
  console.log(votingApp.toString())

  console.log('\nA repo from an app:')
  const repo = await apps[0].repo()
  console.log(repo.toString())

  console.log('\nAn app by address:')
  const appByAddress = await org.app(apps[1].address)
  console.log(appByAddress.toString())

  console.log('\nAn app from a permission:')
  const appFromPermission = await permissions[1].getApp()
  if (appFromPermission) { console.log(appFromPermission.toString()) }
}

async function readVoting(connection: Connection): Promise<void> {
  const org = connection.organization(ORG_ADDRESS)

  console.log('\nApps:')
  const apps = await org.apps()
  apps.map((app: App) => console.log(app.toString()))

  console.log('\nA voting app:')
  const voting = new Voting(
    apps.find((app: App) => app.name == 'voting')!
  )
  console.log(voting.toString())

  console.log('\nVotes:')
  const votes = await voting.votes()
  console.log(votes.toString())

  console.log('\nSome vote\'s casts:')
  const vote = votes[1]
  const casts = await vote.casts()
  console.log(casts)
}

function initConnection(): Connection {
  return aragonConnect({
    connector: [
      'thegraph',
      {
        modules: {
          org: {
            subgraphUrl: 'https://api.thegraph.com/subgraphs/name/0xgabi/dao-subgraph-rinkeby'
          },
          voting: {
            subgraphUrl: 'https://api.thegraph.com/subgraphs/name/ajsantander/voting-subgraph'
          }
        }
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
