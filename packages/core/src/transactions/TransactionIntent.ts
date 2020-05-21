import TransactionPath from './TransactionPath'
import TransactionRequest from './TransactionRequest'
import { verifyTransactionPath } from '../utils/verifyPath'
import { calculateTransactionPath } from '../utils/calculatePath'
import Organization from '../entities/Organization'

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
  #finalForwarder?: string

  constructor(data: TransactionIntentData, org: Organization) {
    this.#org = org

    Object.assign(this, data)
  }

  async paths(
    address: string,
    { as, path }: { as?: string; path?: string[] }
  ): Promise<TransactionPath[]> {
    const paths: TransactionPath[] = []
    // if (path) {
    //   const transactionPath = verifyTransactionPath(
    //     address,
    //     path,
    //     this.contractAddress,
    //     this.functionName,
    //     this.functionArgs,
    //     this.#org
    //   )

    //   if (path) paths.push(transactionPath)
    // }

    // TODO: support calculate transaction path
    // paths = calculateTransactionPath(
    //   address,
    //   this.contractAddress,
    //   this.functionName,
    //   this.functionArgs,
    //   this.#org,
    //   path,
    //   as
    // )

    return paths
  }

  async transactions(
    address: string,
    { as }: { as: string }
  ): Promise<TransactionRequest[]> {
    return (await this.paths(address, { as }))[0].transactions
  }
}
