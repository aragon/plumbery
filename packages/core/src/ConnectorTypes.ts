import App from './wrappers/App'
import Permission from './wrappers/Permission';

// TODO: No functions should be optional.
// Made optional for now so that we can develop one connector at a time.
// Also remove non-null assertions from Organization.ts (e.g. this.#connector.apps!(...)).
export interface ConnectorInterface {
  permissions(orgAddress: string): Promise<Permission[]>
  apps?(orgAddress: string): Promise<App[]>
}
