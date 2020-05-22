import { App } from '@aragon/connect'
import TokenManagerConnectorTheGraph from '../connector'
import Entity from './Entity'
import Token from './Token'

export default class TokenManager extends Entity {
  readonly app: App

  constructor(app: App, subgraphUrl: string) {
    super(new TokenManagerConnectorTheGraph(subgraphUrl))

    this.app = app
  }

  async token(): Promise<Token> {
    return this._connector.token()
  }
}
