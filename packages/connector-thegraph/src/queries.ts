import gql from 'graphql-tag'

export const QUERY_PERMISSIONS = gql`
  query Organization($orgAddress: ID!) {
    organization(id: $orgAddress) {
      acl {
        permissions {
          app {
            address
          }
          entity
          role {
            name
          }
        }
      }
    }
  }
`
