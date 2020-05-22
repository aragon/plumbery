// Generated with https://graphql-code-generator.com/#live-demo

// 1. Get schema from Aragon subgraph (https://github.com/aragon/dao-subgraph)
// 2. Paste in generator (https://graphql-code-generator.com/#live-demo)
// 3. Add on top:
/*  
    directive @entity on OBJECT
    directive @derivedFrom(field: String) on FIELD_DEFINITION

    scalar BigInt
    scalar Bytes

    schema {
      query: Query
    }

    type Query {
      OrgFactory: OrgFactory
      RegistryFactory: RegistryFactory
    }
*/
// 4. Generate and paste output here

export type Maybe<T> = T | null
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  BigInt: any
  Bytes: any
}

export type Query = {
  __typename?: 'Query'
  OrgFactory?: Maybe<OrgFactory>
  RegistryFactory?: Maybe<RegistryFactory>
}

export type RegistryFactory = {
  __typename?: 'RegistryFactory'
  id: Scalars['ID']
  address: Scalars['Bytes']
  registryCount: Scalars['Int']
  registries: Array<Registry>
}

export type Registry = {
  __typename?: 'Registry'
  id: Scalars['ID']
  address: Scalars['Bytes']
  name: Scalars['String']
  node: Scalars['Bytes']
  repoCount: Scalars['Int']
  repos?: Maybe<Array<Repo>>
}

export type Repo = {
  __typename?: 'Repo'
  id: Scalars['ID']
  address: Scalars['Bytes']
  name: Scalars['String']
  node: Scalars['Bytes']
  lastVersion?: Maybe<Version>
  versions?: Maybe<Array<Version>>
  registry: Registry
}

export type Version = {
  __typename?: 'Version'
  id: Scalars['ID']
  semanticVersion: Scalars['String']
  codeAddress: Scalars['Bytes']
  contentUri: Scalars['String']
  repoName: Scalars['String']
  repoAddress: Scalars['Bytes']
  repoNamehash: Scalars['Bytes']
  artifact?: Maybe<Scalars['String']>
  manifest?: Maybe<Scalars['String']>
  apps?: Maybe<Array<App>>
}

export type OrgFactory = {
  __typename?: 'OrgFactory'
  id: Scalars['ID']
  address: Scalars['Bytes']
  orgCount: Scalars['Int']
  organizations?: Maybe<Array<Organization>>
}

export type Organization = {
  __typename?: 'Organization'
  id: Scalars['ID']
  address: Scalars['Bytes']
  acl: Scalars['Bytes']
  recoveryVault: Scalars['Bytes']
  apps?: Maybe<Array<App>>
  permissions?: Maybe<Array<Permission>>
  factory: OrgFactory
}

export type App = {
  __typename?: 'App'
  id: Scalars['ID']
  address: Scalars['Bytes']
  appId: Scalars['String']
  isForwarder?: Maybe<Scalars['Boolean']>
  isUpgradeable?: Maybe<Scalars['Boolean']>
  implementation: Implementation
  version?: Maybe<Version>
  repo?: Maybe<Repo>
  repoName?: Maybe<Scalars['String']>
  repoAddress?: Maybe<Scalars['Bytes']>
  roles?: Maybe<Array<Role>>
  organization: Organization
}

export type Implementation = {
  __typename?: 'Implementation'
  id: Scalars['ID']
  address: Scalars['Bytes']
}

export type Role = {
  __typename?: 'Role'
  id: Scalars['ID']
  nameHash: Scalars['Bytes']
  manager?: Maybe<Scalars['Bytes']>
  appAddress: Scalars['Bytes']
  grantees?: Maybe<Array<Permission>>
}

export type Permission = {
  __typename?: 'Permission'
  id: Scalars['ID']
  appAddress: Scalars['Bytes']
  roleHash: Scalars['Bytes']
  granteeAddress: Scalars['Bytes']
  params?: Maybe<Array<Param>>
}

export type Param = {
  __typename?: 'Param'
  id: Scalars['ID']
  argumentId: Scalars['Int']
  operationType: Scalars['Int']
  argumentValue: Scalars['BigInt']
}

export type IpfsHash = {
  __typename?: 'IpfsHash'
  id: Scalars['ID']
  hash?: Maybe<Scalars['String']>
}
