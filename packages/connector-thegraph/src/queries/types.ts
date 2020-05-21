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

export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  BigInt: any
  Bytes: any
};

export type Query = {
   __typename?: 'Query'
  OrgFactory?: Maybe<OrgFactory>
  RegistryFactory?: Maybe<RegistryFactory>
};

export type RegistryFactory = {
   __typename?: 'RegistryFactory'
  id: Scalars['ID']
  address: Scalars['Bytes']
  registryCount: Scalars['Int']
  registries?: Maybe<Array<Registry>>
};

export type Registry = {
   __typename?: 'Registry'
  id: Scalars['ID']
  address: Scalars['Bytes']
  node: Scalars['Bytes']
  repoCount: Scalars['Int']
  repos?: Maybe<Array<Repo>>
  factory: RegistryFactory
};

export type Repo = {
   __typename?: 'Repo'
  id: Scalars['ID']
  address: Scalars['Bytes']
  name: Scalars['String']
  node: Scalars['Bytes']
  lastVersion?: Maybe<Version>
  versions?: Maybe<Array<Version>>
  registry: Registry
};

export type Version = {
   __typename?: 'Version'
  id: Scalars['ID']
  semanticVersion: Scalars['String']
  contractAddress: Scalars['Bytes']
  content: Scalars['String']
  repo: Repo
  apps?: Maybe<Array<App>>
};

export type OrgFactory = {
   __typename?: 'OrgFactory'
  id: Scalars['ID']
  address: Scalars['Bytes']
  orgCount: Scalars['Int']
  organizations?: Maybe<Array<Organization>>
};

export type Organization = {
   __typename?: 'Organization'
  id: Scalars['ID']
  address: Scalars['Bytes']
  acl?: Maybe<Scalars['Bytes']>
  recoveryVault: Scalars['Bytes']
  apps?: Maybe<Array<App>>
  permissions?: Maybe<Array<Permission>>
  factory: OrgFactory
};

export type App = {
   __typename?: 'App'
  id: Scalars['ID']
  address: Scalars['Bytes']
  appId: Scalars['String']
  isForwarder: Scalars['Boolean']
  isUpgradeable: Scalars['Boolean']
  implementation?: Maybe<Scalars['Bytes']>
  repoVersion?: Maybe<Version>
  artifact?: Maybe<Scalars['String']>
  organization: Organization
  roles?: Maybe<Array<Role>>
};

export type Role = {
   __typename?: 'Role'
  id: Scalars['ID']
  app: App
  hash: Scalars['Bytes']
  manager: Scalars['Bytes']
  allowedEntities?: Maybe<Array<Permission>>
};

export type Permission = {
   __typename?: 'Permission'
  id: Scalars['ID']
  app?: Maybe<App>
  role: Role
  entity: Scalars['Bytes']
  paramsHash?: Maybe<Scalars['Bytes']>
};
