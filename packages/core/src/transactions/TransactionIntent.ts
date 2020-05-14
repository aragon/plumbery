import TransactionPath from './TransactionPath'
import TransactionRequest from './TransactionRequest'
import { calculateTransactionPath } from './utils/simplePath'
import Organization from '../wrappers/Organization'

export interface TransactionIntentData {
  contractAddress: string
  functionName: string
  functionArgs: string[]
}

export default class TransactionIntent {
  readonly contractAddress!: string
  readonly functionName!: string
  readonly functionArgs!: string[]
  #org: Organization

  constructor(data: TransactionIntentData, org: Organization) {
    this.#org = org

    Object.assign(this, data)
  }

  async paths(
    address: string,
    { as, path }: { as?: string; path?: string[] }
  ): Promise<TransactionPath[]> {
    return calculateTransactionPath(
      address,
      this.contractAddress,
      this.functionName,
      this.functionArgs,
      this.#org,
      path,
      as
    )
  }

  async transactions(
    address: string,
    { as }: { as: string }
  ): Promise<TransactionRequest[]> {
    return (await this.paths(address, { as }))[0].transactions
  }
}
