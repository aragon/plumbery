import { Address, BigInt } from '@graphprotocol/graph-ts'
import {
  StartVote as StartVoteEvent,
  CastVote as CastVoteEvent,
  ExecuteVote as ExecuteVoteEvent
} from '../../generated/templates/Voting/Voting'
import {
  Voting as VotingContract
} from '../../generated/templates/Voting/Voting'
import {
  Vote as VoteEntity,
  Cast as CastEntity,
} from '../../generated/schema'

function _getVoteEntityId(appAddress: Address, voteId: BigInt): string {
  return 'appAddress:' + appAddress.toHexString() + '-voteId:' + voteId.toHexString()
}

export function handleStartVote(event: StartVoteEvent): void {
  let appAddress = event.address

  let voteId = event.params.voteId

  let voteEntityId = _getVoteEntityId(appAddress, voteId)
  let vote = new VoteEntity(voteEntityId)

  vote.creator = event.params.creator
  vote.metadata = event.params.metadata

  let voting = VotingContract.bind(appAddress)
  let voteData = voting.getVote(voteId)
  vote.open = voteData.value0
  vote.executed = voteData.value1
  vote.startDate = voteData.value2
  vote.snapshotBlock = voteData.value3
  vote.supportRequiredPct = voteData.value4
  vote.minAcceptQuorum = voteData.value5
  vote.yea = voteData.value6
  vote.nay = voteData.value7
  vote.votingPower = voteData.value8
  vote.script = voteData.value9
  vote.orgAddress = voting.kernel()
  vote.appAddress = appAddress

  vote.executed = false
  vote.casts = []

  vote.save()
}

export function handleCastVote(event: CastVoteEvent): void {
  let appAddress = event.address

  let voteId = event.params.voteId

  let voteEntityId = _getVoteEntityId(appAddress, voteId)
  let vote = VoteEntity.load(voteEntityId)

  let numCasts = vote.casts.length

  let castId = voteEntityId + '-castNum:' + numCasts.toString()
  let cast = new CastEntity(castId)

  cast.voteId = voteId.toHex()
  cast.voter = event.params.voter
  cast.supports = event.params.supports
  cast.voterStake = event.params.stake

  let casts = vote.casts
  casts.push(castId)
  vote.casts = casts

  cast.save()
  vote.save()
}

export function handleExecuteVote(event: ExecuteVoteEvent): void {
  let appAddress = event.address

  let voteId = event.params.voteId

  let voteEntityId = _getVoteEntityId(appAddress, voteId)
  let vote = VoteEntity.load(voteEntityId)

  vote.executed = true
  vote.save()
}