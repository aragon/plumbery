export interface TransactionRequestData {
  chainId: number
  data?: string
  gasLimit: number
  gasPrice: string
  to: string
  value?: string
}

type TransactionRequestDataRpc = any
type TransactionRequestDataWeb3 = any
type TransactionRequestDataEthers = any

export default class TransactionReques {
  readonly chainId!: number
  readonly data?: string
  readonly gasLimit!: number
  readonly gasPrice!: string
  readonly to!: string
  readonly value?: string

  constructor(data: TransactionRequestData) {
    Object.assign(this, data)
  }

  toRpc(): TransactionRequestDataRpc {
    return
  }

  toWeb3(): TransactionRequestDataWeb3 {
    return
  }

  toEthers(): TransactionRequestDataEthers {
    return
  }
}
