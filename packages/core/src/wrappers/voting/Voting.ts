import { App, Vote } from "../.."
import Base from "../Base"

export default class Voting extends Base {
  readonly name?: string
  readonly address!: string
  readonly appId!: string
  readonly version?: string
  readonly registryAddress!: string
  readonly kernelAddress!: string
  readonly isForwarder!: boolean

  constructor(app: App) {
    super(app.connector)

    Object.assign(this, app)
  }

  async votes(): Promise<Vote[]> {
    return this.connector.execute!('voting', 'votesForApp', { appAddress: this.address })
  }
}
