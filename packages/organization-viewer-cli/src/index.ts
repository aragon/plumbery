// import data from './org-data.json'
import {
  aragonConnect,
  Permission,
  App,
  Organization
} from 'plumbery-core'
import {
  GraphQLWrapper
} from 'plumbery-connector-thegraph'
import {
  Voting,
  VotingVote,
  VotingCast
} from 'plumbery-connector-thegraph-voting'
import gql from 'graphql-tag'

const ORG_ADDRESS = '0x00e45b9918297037fe6585c2a1e53e8801f562f4'

async function main() {
  const org = await initAndGetOrg()

  await inspectOrg(org)

  await inspectVotingHighLevel(org)
  await inspectVotingLowLevel(org)
}

async function initAndGetOrg(): Promise<Organization> {
  const connection = aragonConnect({
    connector: [
      'thegraph',
      { daoSubgraphUrl: 'https://api.thegraph.com/subgraphs/name/0xgabi/dao-subgraph-rinkeby' }
    ],
    signer: {},
  })

  console.log('\nOrganization:')
  const org = connection.organization(ORG_ADDRESS)
  console.log(org.toString())

  return org
}

async function inspectOrg(org: Organization): Promise<void> {
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
}

async function inspectVotingHighLevel(org: Organization): Promise<void> {
  const apps = await org.apps()
  const app = apps.find((app: App) => app.name == 'voting')!

  console.log('\nVoting:')
  const voting = new Voting(app, 'https://api.thegraph.com/subgraphs/name/ajsantander/voting-subgraph')
  console.log(voting.toString())

  console.log('\nVotes:')
  const votes = await voting.votes()
  votes.map((vote: VotingVote) => console.log(vote.toString()))

  console.log('\nCasts:')
  const vote = votes[0]
  const casts = await vote.casts()
  casts.map((cast: VotingCast) => console.log(cast.toString()))

  console.log('\nAnalysis of a vote:')
  console.log(`Vote for "${vote.metadata}" was ${vote.executed ? "executed" : "not executed"}, with ${vote.yea} yeas and ${vote.nay} nays.`)
  const voters = casts.map((cast: VotingCast) => cast.voter)
  console.log('Voters:', voters)
}

async function inspectVotingLowLevel(org: Organization): Promise<void> {
  console.log('\nLow-level inspection of a voting app:')
  const wrapper = new GraphQLWrapper('https://api.thegraph.com/subgraphs/name/ajsantander/voting-subgraph')

  const results = await wrapper.performQuery(gql`
    query {
      votes {
        id
        metadata
        creator
      }
    }
  `)

  console.log(JSON.stringify(results.data, null, 2))
}

main()
  .then(() => process.exit(0))
  .catch(err => {
    console.log(`err`, err)
    process.exit(1)
  })
