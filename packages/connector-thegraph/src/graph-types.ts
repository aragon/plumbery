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
  Factory?: Maybe<FactoryData>
  Registry?: Maybe<Registry>
};

export type Registry = {
  __typename?: 'Registry'
  id: Scalars['ID']
  repoCount: Scalars['Int']
  repos?: Maybe<Array<RepoData>>
};

export type RepoData = {
  __typename?: 'Repo'
  id: Scalars['ID']
  address: Scalars['Bytes']
  name: Scalars['String']
  node: Scalars['Bytes']
  lastVersion?: Maybe<VersionData>
  versions?: Maybe<Array<VersionData>>
  apps?: Maybe<Array<AppData>>
};

export type VersionData = {
  __typename?: 'Version'
  id: Scalars['ID']
  semanticVersion: Scalars['String']
  contractAddress: Scalars['Bytes']
  content: Scalars['String']
  repo: RepoData
};

export type FactoryData = {
  __typename?: 'Factory'
  id: Scalars['ID']
  orgCount: Scalars['Int']
  organizations?: Maybe<Array<OrganizationData>>
};

export type OrganizationData = {
  __typename?: 'Organization'
  id: Scalars['ID']
  address: Scalars['Bytes']
  acl?: Maybe<AclData>
  recoveryVault: Scalars['Bytes']
  apps?: Maybe<Array<AppData>>
  factory: FactoryData
};

export type AclData = {
  __typename?: 'Acl'
  id: Scalars['ID']
  address: Scalars['Bytes']
  permissions?: Maybe<Array<PermissionData>>
  organization: OrganizationData
};

export type PermissionData = {
  __typename?: 'Permission'
  id: Scalars['ID']
  app?: Maybe<AppData>
  role: RoleData
  entity: Scalars['Bytes']
  allowed?: Maybe<Scalars['Boolean']>
};

export type AppData = {
  __typename?: 'App'
  id: Scalars['ID']
  address: Scalars['Bytes']
  appId: Scalars['String']
  isForwarder: Scalars['Boolean']
  isUpgradeable: Scalars['Boolean']
  implementation?: Maybe<Scalars['Bytes']>
  repo?: Maybe<RepoData>
  organization: OrganizationData
  roles?: Maybe<Array<RoleData>>
};

export type RoleData = {
  __typename?: 'Role'
  id: Scalars['ID']
  app: AppData
  name: Scalars['String']
  manager: Scalars['Bytes']
  allowedEntities?: Maybe<Array<PermissionData>>
};
