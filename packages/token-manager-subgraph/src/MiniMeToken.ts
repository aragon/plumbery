import { BigInt, Address } from '@graphprotocol/graph-ts'
import { Transfer as TransferEvent } from '../generated/templates/MiniMeToken/MiniMeToken'
import { TokenHolder as TokenHolderEntity } from '../generated/schema'
import { MiniMeToken as MiniMeTokenTemplate } from '../generated/templates'
import { MiniMeToken as MiniMeTokenEntity } from '../generated/schema'
import { MiniMeToken as MiniMeTokenContract } from '../generated/templates/MiniMeToken/MiniMeToken'
// import { ClaimedTokens as ClaimedTokensEvent } from '../generated/templates/MiniMeToken/MiniMeToken'
// import { NewCloneToken as NewCloneTokenEvent } from '../generated/templates/MiniMeToken/MiniMeToken'

export function initializeMiniMeToken(
  tokenManagerId: string,
  tokenManagerAddress: Address,
  orgAddress: Address,
  tokenAddress: Address
): void {
  MiniMeTokenTemplate.create(tokenAddress)

  let miniMeTokenEntity = new MiniMeTokenEntity(
    _getTokenEntityId(tokenAddress)
  )

  miniMeTokenEntity.address = tokenAddress
  miniMeTokenEntity.tokenManager = tokenManagerId
  miniMeTokenEntity.orgAddress = orgAddress
  miniMeTokenEntity.appAddress = tokenManagerAddress

  let tokenContract = MiniMeTokenContract.bind(tokenAddress)

  miniMeTokenEntity.name = tokenContract.name()
  miniMeTokenEntity.address = tokenAddress
  miniMeTokenEntity.symbol = tokenContract.symbol()
  miniMeTokenEntity.totalSupply = tokenContract.totalSupply()
  miniMeTokenEntity.transferable = tokenContract.transfersEnabled()
  miniMeTokenEntity.holders = new Array<string>()

  miniMeTokenEntity.save()
}

export function handleTransfer(event: TransferEvent): void {
  let tokenAddress = event.address

  let miniMeTokenEntity = MiniMeTokenEntity.load(
    _getTokenEntityId(tokenAddress)
  )

  let transferedAmount = event.params._amount

  let sendingHolderAddress = event.params._from
  let sendingHolder = _getTokenHolder(tokenAddress, sendingHolderAddress)
  if (sendingHolder) {
    sendingHolder.balance = sendingHolder.balance.minus(transferedAmount)
  }

  let receivingHolderAddress = event.params._to
  let receivingHolder = _getTokenHolder(tokenAddress, receivingHolderAddress)
  if (receivingHolder) {
    // If new holder, add to holders array.
    let holders = miniMeTokenEntity.holders
    if (receivingHolder.balance.equals(new BigInt(0)) && !holders.includes(receivingHolder.id)) {
      holders.push(receivingHolder.id)
      miniMeTokenEntity.holders = holders

      miniMeTokenEntity.save()
    }

    receivingHolder.balance = receivingHolder.balance.plus(transferedAmount)
  }

  if(sendingHolder) {
    sendingHolder.save()
  }

  if (receivingHolder) {
    receivingHolder.save()
  }
}

// export function handleApproval(event: ApprovalEvent): void {}
// export function handleClaimedTokens(event: ClaimedTokensEvent): void {}
// export function handleNewCloneToken(event: NewCloneTokenEvent): void {}

function _getTokenEntityId(tokenAddress: Address): string {
  return 'tokenAddress-' + tokenAddress.toHexString()
}

function _getTokenHolder(tokenAddress: Address, holderAddress: Address): TokenHolderEntity | null {
  if (holderAddress.toHexString() == '0x0000000000000000000000000000000000000000') {
    return null
  }

  let tokenHolderId = 'tokenAddress-' + tokenAddress.toHexString() + '-holderAddress-' + holderAddress.toHexString()
  let tokenHolder = TokenHolderEntity.load(tokenHolderId)

  if (!tokenHolder) {
    tokenHolder = new TokenHolderEntity(tokenHolderId)

    tokenHolder.address = holderAddress
    tokenHolder.balance = new BigInt(0)
    tokenHolder.tokenAddress = tokenAddress

    tokenHolder.save()
  }

  return tokenHolder
}