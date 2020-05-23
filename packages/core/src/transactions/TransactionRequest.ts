import { ethers } from 'ethers'

export interface TransactionRequestData {
  chainId?: number
  data?: string
  from: string
  gas?: ethers.types.BigNumber
  gasLimit?: ethers.types.BigNumber
  gasPrice?: ethers.types.BigNumber
  to: string
  value?: string
}

export default class TransactionRequest {
  readonly chainId!: number
  readonly data?: string
  readonly from!: string
  readonly gas!: ethers.types.BigNumber
  readonly gasLimit!: ethers.types.BigNumber
  readonly gasPrice!: ethers.types.BigNumber
  readonly to!: string
  readonly value?: string

  constructor(data: TransactionRequestData) {
    Object.assign(this, data)
  }
}
