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

export const CASTS_FOR_VOTE = gql`
  query Casts($voteId: ID!) {
    casts(where: {
      voteId: $voteId
    }) {
      id
      voteId
      voter
      supports
    }
  }
`