import TransactionRequest from './TransactionRequest'
import App from '../wrappers/App'

export interface TransactionPathData {
  apps: App[]
  destination: string
  transactions: TransactionRequest[]
}

export default class TransactionPath {
  readonly apps!: App[]
  readonly destination!: string
  readonly transactions!: TransactionRequest[]

  constructor(data: TransactionPathData) {
    Object.assign(this, data)
  }
}
