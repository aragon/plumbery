// import data from './org-data.json'
import { ethers } from 'ethers'

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

const DAO_SUBGRAPH_URL =
  'https://api.thegraph.com/subgraphs/name/aragon/aragon-mainnet-staging'
const ALL_VOTING_SUBGRAPH_URL =
  'https://api.thegraph.com/subgraphs/name/ajsantander/aragon-voting'
const ALL_TOKEN_MANAGER_SUBGRAPH_URL =
  'https://api.thegraph.com/subgraphs/name/ajsantander/aragon-token-rinkeby'

const ORG_ADDRESS = '0x0c188b183ff758500d1d18b432313d10e9f6b8a4'
const VOTING_APP_ADDRESS = '0x8012a3f8632870e64994751f7e0a6da2a287eda3'
const TOKENS_APP_ADDRESS = '0x8db3b9d93275ed6de3351846487117da02ab4e96'

async function main() {
  const org = await initAndGetOrg()

  await inspectOrg(org)

  await trySimplePath(org)

  await inspectVotingHighLevel(VOTING_APP_ADDRESS)
  await inspectVotingLowLevel(VOTING_APP_ADDRESS)

  await inspectTokenManager(TOKENS_APP_ADDRESS)
}

async function initAndGetOrg(): Promise<Organization> {
  const readProvider = ethers.getDefaultProvider(network)

  const org = Connect(ORG_ADDRESS, {
    connector: [
      'thegraph',
      {
        daoSubgraphUrl: DAO_SUBGRAPH_URL,
      },
    ],
    readProvider,
  }) as Organization

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

async function trySimplePath(org: Organization): Promise<void> {
  const app = (await org.apps())[3]
  console.log(app.toString())

  const account = '0xDC870979E88f771232e77e7A95A0c52E8Dc866FD'

  const intent = org.appIntent(app.address, 'newImmediatePayment', [
    ethers.constants.AddressZero,
    account,
    ethers.utils.bigNumberify(1),
    'Test payment',
  ])

  const timeLockAddress = '0xbce6ac172da935a8eb54bd102dd017e3dd2b0c9d'
  const dandelionVotingAddress = '0x109b588a4f2a234e302c722f91fe42c5ab828a32'
  const financeAddress = '0x34ca726d39eae3c8007d18220da99a3a328cba35'

  const txPath = await intent.paths(account, {
    path: [timeLockAddress, dandelionVotingAddress, financeAddress],
  })

  console.log(txPath.toString())
}

async function inspectTokenManager(appAddress: string): Promise<void> {
  console.log('\nTokenManager:')

  const tokenManager = new TokenManager(
    appAddress,
    ALL_TOKEN_MANAGER_SUBGRAPH_URL
  )

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
  console.log(
    `Vote for "${vote.metadata}" was ${
      vote.executed ? 'executed' : 'not executed'
    }, with ${vote.yea} yeas and ${vote.nay} nays.`
  )

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
