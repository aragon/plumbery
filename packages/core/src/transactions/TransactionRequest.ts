export interface TransactionRequestData {
  chainId?: number
  data?: string
  from: string
  gas?: string
  gasLimit?: string
  gasPrice?: string
  to: string
  value?: string
}

export default class TransactionRequest {
  readonly chainId!: number
  readonly data?: string
  readonly from!: string
  readonly gas!: string
  readonly gasLimit!: string
  readonly gasPrice!: string
  readonly to!: string
  readonly value?: string

  constructor(data: TransactionRequestData) {
    Object.assign(this, data)
  }
}
