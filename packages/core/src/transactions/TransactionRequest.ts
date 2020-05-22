export interface TransactionRequestData {
  from: string
  chainId: number
  data?: string
  gas: string
  gasLimit: number
  gasPrice: string
  to: string
  value?: string
}

export default class TransactionRequest {
  readonly from!: string
  readonly chainId!: number
  readonly data?: string
  readonly gasLimit!: number
  readonly gasPrice!: string
  readonly to!: string
  readonly value?: string

  constructor(data: TransactionRequestData) {
    Object.assign(this, data)
  }
}
