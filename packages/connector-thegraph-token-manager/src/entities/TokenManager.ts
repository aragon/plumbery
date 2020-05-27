import Entity from './Entity'
import Token from './Token'
import TokenManagerConnectorTheGraph from "../connector";

export default class TokenManager extends Entity {
  readonly appAddress: string

  constructor(appAddress: string, subgraphUrl: string) {
    super(new TokenManagerConnectorTheGraph(subgraphUrl))

    this.appAddress = appAddress
  }

  async token(): Promise<Token> {
    return this._connector.token(this.appAddress)
  }
}