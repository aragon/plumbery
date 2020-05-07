import gql from 'graphql-tag'

export const REPO_FRAGMENT = gql`
  fragment Repo_repo on Repo {
    address
    name
    lastVersion {
      semanticVersion
    }
  }
`

export const APP_FRAGMENT = gql`
  fragment App_app on App {
    address
    appId
    repo {
      ...Repo_repo
    }
  }
  ${REPO_FRAGMENT}
`
