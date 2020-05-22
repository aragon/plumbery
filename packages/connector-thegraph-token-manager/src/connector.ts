import { GraphQLWrapper } from '@aragon/connect-thegraph'
import * as queries from './queries'
import Token, { TokenData } from './entities/Token'
import TokenHolder, { TokenHolderData } from './entities/TokenHolder'
import { parseToken, parseTokenHolders } from './parsers'

export default class TokenManagerConnectorTheGraph extends GraphQLWrapper {
  async token(): Promise<Token> {
    const result = await this.performQuery(queries.TOKEN, {})

    const data = this.parseQueryResult(parseToken, result)

    return new Token(data, this)
  }

  async tokenHolders(): Promise<TokenHolder[]> {
    const result = await this.performQuery(queries.TOKEN_HOLDERS, {})

    const datas = this.parseQueryResult(parseTokenHolders, result)

    return datas.map((data: TokenHolderData) => {
      return new TokenHolder(data, this)
    })
  }
}
