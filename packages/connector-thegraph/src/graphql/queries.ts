import gql from 'graphql-tag'
import * as fragments from './fragments'

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
        ...App_app
      }
    }
  }
  ${fragments.APP_FRAGMENT}
`

export const APP_BY_ADDRESS = gql`
  query App($appAddress: String!) {
    app(id: $appAddress) {
      ...App_app
    }
  }
  ${fragments.APP_FRAGMENT}
`

export const REPO_BY_APP_ADDRESS = gql`
  query Repo($appAddress: String!) {
    app(id: $appAddress) {
      repo {
        ...Repo_repo
      }
    }
  }
  ${fragments.REPO_FRAGMENT}
`