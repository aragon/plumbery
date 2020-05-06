import gql from 'graphql-tag'

export const ORGANIZATION_PERMISSIONS = gql`
  query Organization($orgAddress: String!) {
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

export const ORGANIZATION_APPS = gql`
  query Organization($orgAddress: String!) {
    organization(id: $orgAddress) {
      apps {
        address
        appId
        repo {
          name
          address
        }
      }
    }
  }
`

export const APP_BY_ADDRESS = gql`
  query App($appAddress: String!) {
    app(id: $appAddress) {
      address
      repo {
        name
      }
    }
  }
`

export const REPO_BY_APP_ADDRESS = gql`
  query Repo($appAddress: String!) {
    app(id: $appAddress) {
      repo {
        address
        name
        lastVersion {
          semanticVersion
        }
      }
    }
  }
`