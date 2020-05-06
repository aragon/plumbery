// Generated with https://graphql-code-generator.com/#live-demo

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
  Factory?: Maybe<FactoryDataGql>
  Registry?: Maybe<RegistryDataGql>
};

export type RegistryDataGql = {
  __typename?: 'Registry'
  id: Scalars['ID']
  repoCount: Scalars['Int']
  repos?: Maybe<Array<RepoDataGql>>
};

export type RepoDataGql = {
  __typename?: 'Repo'
  id: Scalars['ID']
  address: Scalars['Bytes']
  name: Scalars['String']
  node: Scalars['Bytes']
  lastVersion?: Maybe<VersionDataGql>
  versions?: Maybe<Array<VersionDataGql>>
  apps?: Maybe<Array<AppDataGql>>
};

export type VersionDataGql = {
  __typename?: 'Version'
  id: Scalars['ID']
  semanticVersion: Scalars['String']
  contractAddress: Scalars['Bytes']
  content: Scalars['String']
  repo: RepoDataGql
};

export type FactoryDataGql = {
  __typename?: 'Factory'
  id: Scalars['ID']
  orgCount: Scalars['Int']
  organizations?: Maybe<Array<OrganizationDataGql>>
};

export type OrganizationDataGql = {
  __typename?: 'Organization'
  id: Scalars['ID']
  address: Scalars['Bytes']
  acl?: Maybe<AclDataGql>
  recoveryVault: Scalars['Bytes']
  apps?: Maybe<Array<AppDataGql>>
  factory: FactoryDataGql
};

export type AclDataGql = {
  __typename?: 'Acl'
  id: Scalars['ID']
  address: Scalars['Bytes']
  permissions?: Maybe<Array<PermissionDataGql>>
  organization: OrganizationDataGql
};

export type PermissionDataGql = {
  __typename?: 'Permission'
  id: Scalars['ID']
  app?: Maybe<AppDataGql>
  role: RoleDataGql
  entity: Scalars['Bytes']
  allowed?: Maybe<Scalars['Boolean']>
};

export type AppDataGql = {
  __typename?: 'App'
  id: Scalars['ID']
  address: Scalars['Bytes']
  appId: Scalars['String']
  isForwarder: Scalars['Boolean']
  isUpgradeable: Scalars['Boolean']
  implementation?: Maybe<Scalars['Bytes']>
  repo?: Maybe<RepoDataGql>
  organization: OrganizationDataGql
  roles?: Maybe<Array<RoleDataGql>>
};

export type RoleDataGql = {
  __typename?: 'Role'
  id: Scalars['ID']
  app: AppDataGql
  name: Scalars['String']
  manager: Scalars['Bytes']
  allowedEntities?: Maybe<Array<PermissionDataGql>>
};
