import { BigInt, Address } from '@graphprotocol/graph-ts'
import { TokenHolder as TokenHolderEntity } from '../../generated/schema'

export function getTokenHolder(holderAddress: Address): TokenHolderEntity | null {
  // if (holderAddress.toHexString() == '0x0000000000000000000000000000000000000000') {
  //   return null
  // }

  // let tokenHolderId = 'holderAddress-' + holderAddress.toHexString()

  // let tokenHolder = TokenHolderEntity.load(tokenHolderId)

  // if (!tokenHolder) {
  //   tokenHolder = new TokenHolderEntity(tokenHolderId)
  //   tokenHolder.address = holderAddress
  //   tokenHolder.balance = new BigInt(0)

  //   let approvals = new Array<string>()
  //   tokenHolder.approvals = approvals

  //   tokenHolder.save()
  // }

  // return tokenHolder
}
