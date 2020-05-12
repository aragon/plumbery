import gql from 'graphql-tag'

export const ALL_VOTES = gql`
  query {
    votes {
      id
      creator
      metadata
      executed
    }
  }
`