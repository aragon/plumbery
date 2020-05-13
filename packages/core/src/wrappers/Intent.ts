import Base from './Base'
import { ConnectorInterface } from '../ConnectorTypes'
import TransactionPath from '../transactions/TransactionPath'
import TransactionRequest from '../transactions/TransactionRequest'

export interface IntentData {
  contractAddress: string
  functionName: string
  functionArgs: string[]
}

function calculateTransactionPath(): any {
  return
}

export default class Intent extends Base {
  readonly contractAddress!: string
  readonly functionName!: string
  readonly functionArgs!: string[]

  constructor(data: IntentData, connector: ConnectorInterface) {
    super(connector)

    Object.assign(this, data)
  }

  async paths(
    address: string,
    { as }: { as: string }
  ): Promise<TransactionPath[]> {
    return calculateTransactionPath()
  }

  async transactions(
    address: string,
    { as }: { as: string }
  ): Promise<TransactionRequest[]> {
    return (await this.paths(address, { as }))[0].transactions
  }
}
