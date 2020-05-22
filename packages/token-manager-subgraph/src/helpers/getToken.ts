
import { Address } from '@graphprotocol/graph-ts'
import { Token as TokenEntity } from '../../generated/schema'
import { MiniMeToken as MiniMeTokenContract } from '../../generated/templates/MiniMeToken/MiniMeToken'

export function getToken(tokenAddress: Address): TokenEntity {
  let token = TokenEntity.load(tokenAddress.toHexString())

  if (!token) {
    token = new TokenEntity(tokenAddress.toHexString())

    let tokenContract = MiniMeTokenContract.bind(tokenAddress)

    token.name = tokenContract.name()
    token.address = tokenAddress
    token.symbol = tokenContract.symbol()
    token.totalSupply = tokenContract.totalSupply()
    token.transferable = tokenContract.transfersEnabled()
    token.holders = new Array<string>()

    token.save()
  }

  return token!
}
