import App from './wrappers/App'
import Permission from './wrappers/Permission';
import Repo from './wrappers/Repo';

// TODO: No functions should be optional.
// Made optional for now, so that we can develop one connector at a time.
// When making these non-optional, make sure to also:
//   * remove non-null assertions from Organization.ts (e.g. this.#connector.apps!(...)).
//   * remove similar non-null assertions all wrappers.
export interface ConnectorInterface {
  permissionsForOrg(orgAddress: string): Promise<Permission[]>
  appsForOrg?(orgAddress: string): Promise<App[]>
  repoForApp?(appAddress: string): Promise<Repo>
}
