import gql from 'graphql-tag'
import * as fragments from './fragments'

export const ORGANIZATION_PERMISSIONS = gql`
  query Organization($orgAddress: String!) {
    organization(id: $orgAddress) {
      permissions {
        id
        app {
          address
        }
        entity
        role {
          id
          hash
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
  query App($appAddress: String!) {
    app(id: $appAddress) {
      repoVersion {
        repo {
          ...Repo_repo
        }
      }
    }
  }
  ${fragments.REPO_FRAGMENT}
`

export const ROLE_BY_ID = gql`
  query Role($roleId: String!) {
    role(id: $roleId) {
      hash
      id
    }
  }
`
