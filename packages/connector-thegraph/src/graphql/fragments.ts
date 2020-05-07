import gql from 'graphql-tag'

export const REPO_FRAGMENT = gql`
  fragment Repo_repo on Repo {
    address
    name
    lastVersion {
      semanticVersion
    }
    registry {
      address
    }
  }
`

export const VERSION_FRAGMENT = gql`
  fragment Version_version on Version {
    semanticVersion
    contractAddress
    content
    repo {
      ...Repo_repo
    }
  }
  ${REPO_FRAGMENT}
`

export const APP_FRAGMENT = gql`
  fragment App_app on App {
    address
    appId
    repoVersion {
      ...Version_version
    }
  }
  ${VERSION_FRAGMENT}
`
