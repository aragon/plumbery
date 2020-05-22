import { BigInt, Address } from '@graphprotocol/graph-ts'
import { ClaimedTokens as ClaimedTokensEvent } from '../generated/templates/MiniMeToken/MiniMeToken'
import { Transfer as TransferEvent } from '../generated/templates/MiniMeToken/MiniMeToken'
import { NewCloneToken as NewCloneTokenEvent } from '../generated/templates/MiniMeToken/MiniMeToken'
import { Approval as ApprovalEvent } from '../generated/templates/MiniMeToken/MiniMeToken'
import { Approval as ApprovalEntity } from '../generated/schema'
import { getToken } from './helpers/getToken'
import { getTokenHolder } from './helpers/getTokenHolder'

export function handleTransfer(event: TransferEvent): void {
  let tokenAddress = event.address
  let token = getToken(tokenAddress)

  let transferedAmount = event.params._amount

  let sendingHolder = getTokenHolder(event.params._from)
  if (sendingHolder) {
    sendingHolder.balance = sendingHolder.balance.minus(transferedAmount)
  }

  let receivingHolder = getTokenHolder(event.params._to)
  let receivingHolderPrevBalance = receivingHolder.balance
  if (receivingHolder) {
    receivingHolder.balance = receivingHolder.balance.plus(transferedAmount)

    // If new holder, add to holders array.
    let holders = token.holders
    if (receivingHolderPrevBalance.equals(new BigInt(0)) && !holders.includes(receivingHolder.id)) {
      holders.push(receivingHolder.id)
      token.holders = holders

      token.save()
    }
  }

  if(sendingHolder) {
    sendingHolder.save()
  }

  if (receivingHolder) {
    receivingHolder.save()
  }
}

export function handleApproval(event: ApprovalEvent): void {
  let txHash = event.transaction.hash
  let approvalId = 'txHash-' + txHash.toHexString()

  let approval = new ApprovalEntity(approvalId)

  approval.txHash = txHash
  approval.owner = event.params._owner
  approval.spender = event.params._spender
  approval.amount = event.params._amount

  let tokenHolder = getTokenHolder(approval.owner as Address)

  let approvals = tokenHolder.approvals
  approvals.push(approval.id)
  tokenHolder.approvals = approvals

  tokenHolder.save()
  approval.save()
}

export function handleClaimedTokens(event: ClaimedTokensEvent): void {}
export function handleNewCloneToken(event: NewCloneTokenEvent): void {}
