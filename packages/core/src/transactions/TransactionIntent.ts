import { ethers } from 'ethers'

import TransactionPath from './TransactionPath'
import TransactionRequest from './TransactionRequest'
import Organization from '../entities/Organization'
import { verifyTransactionPath } from '../utils/verifyPath'

export interface TransactionIntentData {
  contractAddress: string
  functionName: string
  functionArgs: any[]
}

export default class TransactionIntent {
  readonly contractAddress!: string
  readonly functionName!: string
  readonly functionArgs!: any[]

  #org: Organization
  #provider: ethers.providers.Provider | undefined

  constructor(
    data: TransactionIntentData,
    org: Organization,
    provider?: ethers.providers.Provider
  ) {
    this.#org = org
    this.#provider = provider

    Object.assign(this, data)
  }

  async paths(
    address: string,
    { as, path }: { as?: string; path?: string[] }
  ): Promise<TransactionPath[]> {
    const paths: TransactionPath[] = []
    if (path) {
      const transactionPath = await verifyTransactionPath(
        address,
        path,
        this.contractAddress,
        this.functionName,
        this.functionArgs,
        this.#org,
        this.#provider
      )

      paths.push(transactionPath)
    }

    // TODO: support calculate transaction path

    return paths
  }

  async transactions(
    address: string,
    { as }: { as: string }
  ): Promise<TransactionRequest[]> {
    return (await this.paths(address, { as }))[0].transactions
  }
}
