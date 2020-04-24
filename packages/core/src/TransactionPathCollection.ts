import TransactionPath from './TransactionPath'

export default class TransactionPathCollection {
  readonly paths: TransactionPath[]
  constructor() {
    this.paths = []
  }
}
