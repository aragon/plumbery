
// import data from './org-data.json'
import {
  aragonConnect,
  Permission,
  App
} from 'plumbery-core'
import {
  Voting,
  Vote,
  Cast
} from 'plumbery-connector-thegraph'

const ORG_ADDRESS = '0x00e45b9918297037fe6585c2a1e53e8801f562f4'

async function main() {
  const votingApp = await inspectOrgAndGetVotingApp()
  await interactWithVotingApp(votingApp)
}

async function inspectOrgAndGetVotingApp(): Promise<App> {
  const connection = aragonConnect({
    connector: [
      'thegraph',
      { daoSubgraphUrl: 'https://api.thegraph.com/subgraphs/name/0xgabi/dao-subgraph-rinkeby' }
    ],
    signer: {},
  })

  const org = connection.organization(ORG_ADDRESS)

  console.log('\nPermissions:')
  const permissions = await org.permissions()
  permissions.map((permission: Permission) => console.log(permission.toString()))

  console.log('\nA role from a permission:')
  const role = await permissions[4].getRole()
  console.log(role.toString())

  console.log('\nApps:')
  const apps = await org.apps()
  apps.map((app: App) => console.log(app.toString()))

  console.log('\nA voting app:')
  const votingApp = apps.find((app: App) => app.name == 'voting')!
  console.log(votingApp.toString())

  console.log('\nA repo from an app:')
  const repo = await apps[2].repo()
  console.log(repo.toString())

  console.log('\nAn app by address:')
  const appByAddress = await org.app(apps[1].address)
  console.log(appByAddress.toString())

  console.log('\nAn app from a permission:')
  const appFromPermission = await permissions[1].getApp()
  if (appFromPermission) { console.log(appFromPermission.toString()) }

  return votingApp
}

async function interactWithVotingApp(app: App): Promise<void> {
  const voting = new Voting(app, 'https://api.thegraph.com/subgraphs/name/ajsantander/voting-subgraph')

  console.log('\nVotes:')
  const votes = await voting.votes()
  votes.map((vote: Vote) => console.log(vote.toString()))

  console.log('\nAnalysis of a vote:')
  const vote = votes[0]
  const casts = await vote.casts()
  const yeas = casts.filter((cast: Cast) => cast.supports).length
  const nays = casts.filter((cast: Cast) => !cast.supports).length
  console.log(`Vote for "${vote.metadata}" was ${vote.executed ? "executed" : "not executed"}, with ${yeas} yeas and ${nays} nays.`)
}

main()
  .then(() => process.exit(0))
  .catch(err => {
    console.log(`err`, err)
    process.exit(1)
  })
