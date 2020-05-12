import App from './wrappers/App'
import Permission from './wrappers/Permission';
import Repo from './wrappers/Repo';
import Role from './wrappers/Role';

// TODO: No functions should be optional.
// Made optional for now, so that we can develop one connector at a time.
// When making these non-optional, make sure to also:
//   * remove non-null assertions from Organization.ts (e.g. this.#connector.apps!(...)).
//   * remove similar non-null assertions all wrappers.

export interface ConnectorInterface {
  execute?(moduleName: string, selectorName: string, args: any): Promise<any>
  dummy?(): void // TODO: remove.
}

export interface ConnectorCoreModuleInterface {
  permissionsForOrg(orgAddress: string): Promise<Permission[]>
  appsForOrg?(orgAddress: string): Promise<App[]>
  repoForApp?(appAddress: string): Promise<Repo>
  appByAddress?(appAddress: string): Promise<App>
  roleById?(roleId: string): Promise<Role>
}