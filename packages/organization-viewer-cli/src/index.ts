// import data from './org-data.json'
import { Connect, Permission, App, Role, Organization } from 'plumbery-core'
import { GraphQLWrapper } from 'plumbery-connector-thegraph'
import {
  Voting,
  VotingVote,
  VotingCast,
} from 'plumbery-connector-thegraph-voting'
import {
  TokenManager,
  Token,
  TokenHolder,
} from 'plumbery-connector-thegraph-token-manager'
import gql from 'graphql-tag'

const DAO_SUBGRAPH_URL = 'https://api.thegraph.com/subgraphs/name/aragon/aragon-mainnet-staging'
const ALL_VOTING_SUBGRAPH_URL = 'https://api.thegraph.com/subgraphs/name/ajsantander/aragon-voting'
const SINGLE_TOKEN_MANAGER_SUBGRAPH_URL =  'https://api.thegraph.com/subgraphs/name/ajsantander/token-manager'

const ORG_ADDRESS = '0x0c188b183ff758500d1d18b432313d10e9f6b8a4'
const VOTING_APP_ADDRESS = '0x8012a3f8632870e64994751f7e0a6da2a287eda3'

async function main() {
  const org = await initAndGetOrg()

  await inspectOrg(org)

  await inspectVotingHighLevel(VOTING_APP_ADDRESS)
  await inspectVotingLowLevel(VOTING_APP_ADDRESS)

  await inspectTokenManager(org)
}

async function initAndGetOrg(): Promise<Organization> {
  const org = Connect(
    ORG_ADDRESS,
    {
      connector: [
        'thegraph',
        {
          daoSubgraphUrl: DAO_SUBGRAPH_URL,
        },
      ],
    }
  ) as Organization

  console.log('\nOrganization initialized')

  return org
}

async function inspectOrg(org: Organization): Promise<void> {
  console.log('\nPermissions:')
  const permissions = await org.permissions()
  permissions.map((permission: Permission) =>
    console.log(permission.toString())
  )

  console.log('\nA role from a permission:')
  const role = await permissions[4].getRole()
  console.log(role?.toString())

  console.log('\nApps:')
  const apps = await org.apps()
  apps.map((app: App) => {
    console.log(app.toString())
  })

  console.log('\nA voting app:')
  const votingApp = apps.find((app: App) => app.name == 'dandelion-voting')!
  console.log(votingApp.toString())

  console.log('\nRoles of an app:')
  const roles = await votingApp.roles()
  roles.map((role: Role) => {
    console.log(role.toString())
  })

  console.log('\nA repo from an app:')
  const repo = await apps[2].repo()
  console.log(repo.toString())

  console.log('\nAn app by address:')
  const appByAddress = await org.app(apps[1].address)
  console.log(appByAddress.toString())

  console.log('\nAn app from a permission:')
  const appFromPermission = await permissions[1].getApp()
  if (appFromPermission) {
    console.log(appFromPermission.toString())
  }
}

async function inspectTokenManager(org: Organization): Promise<void> {
  const apps = await org.apps()
  const app = apps.find(
    (app: App) => app.address == '0xef39ab8cb13cd7fa408a9fff8372a8aa3e1ee844'
  )!

  console.log('\nTokenManager:')
  
  const tokenManager = new TokenManager(app, SINGLE_TOKEN_MANAGER_SUBGRAPH_URL)
  
  console.log(tokenManager.toString())

  console.log('\nToken:')
  const token = await tokenManager.token()
  console.log(token)

  console.log('\nHolders:')
  const holders = await token.holders()
  console.log(holders)
}

async function inspectVotingHighLevel(appAddress: string): Promise<void> {
  console.log('\nVoting:')
  
  const voting = new Voting(appAddress, ALL_VOTING_SUBGRAPH_URL)

  console.log(voting.toString())

  console.log('\nVotes:')
  const votes = await voting.votes()
  votes.map((vote: VotingVote) => console.log(vote.toString()))

  if (votes.length == 0) {
    return
  }

  console.log('\nAnalysis of a vote:')
  const vote = votes[0]
  console.log(`Vote for "${vote.metadata}" was ${vote.executed ? "executed" : "not executed"}, with ${vote.yea} yeas and ${vote.nay} nays.`)

  console.log('\nCasts:')
  const casts = await vote.casts()
  casts.map((cast: VotingCast) => console.log(cast.toString()))

  const voters = casts.map((cast: VotingCast) => cast.voter)
  console.log('Voters:', voters)
}

async function inspectVotingLowLevel(appAddress: string): Promise<void> {
  console.log('\nLow-level inspection of a voting app:')
  const wrapper = new GraphQLWrapper(ALL_VOTING_SUBGRAPH_URL)

  const results = await wrapper.performQuery(gql`
    query {
      votes(where:{
        appAddress: "${appAddress}"
      }) {
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
  .catch((err) => {
    console.log(`err`, err)
    process.exit(1)
  })
