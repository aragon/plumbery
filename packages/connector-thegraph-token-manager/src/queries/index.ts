import gql from 'graphql-tag'

export const TOKEN = gql`
  query {
    tokens(first: 1) {
      id
      address
      totalSupply
      transferable
      name
      symbol
    }
  }
`

export const TOKEN_HOLDERS = gql`
  query {
    tokenHolders {
      id
      address
      balance
    }
  }
`