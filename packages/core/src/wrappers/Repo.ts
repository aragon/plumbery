import BaseWrapper from "./BaseWrapper"
import { ConnectorInterface } from "../ConnectorTypes"

// TODO: Implement all properties and methods from the API spec (https://github.com/aragon/plumbery/blob/master/docs/repo.md).
// [ ] author 	String 	Author of the app. E.g. "Aragon Association".
// [ ] changelogUrl 	String 	URL of the app versions changelog.
// [ ] descriptionUrl 	String 	URL pointing to the long description of the app.
// [ ] description 	String 	Description of the app. E.g. "Manage an organization’s token supply and distribution.".
// [ ] environments 	{ [chainId]: { registry: String, appName: String, chainId: String } } 	Environments supported by the app.
// [ ] icons 	{ src: String, sizes: String }[] 	Icons of the app (follows the web app manifest icons format).
// [x] name 	String 	Name of the app. E.g. "Tokens".
// [ ] roles 	Role[] 	Roles supported by the app.
// [ ] screenshots 	String[] 	Array of screenshots for the app.
// [ ] sourceUrl 	String 	URL for the source code of the app.

export interface RepoData {
  name: string
  address: string
}

export default class Repo extends BaseWrapper implements RepoData {
  readonly name!: string
  readonly address!: string

  constructor(data: RepoData, connector: ConnectorInterface) {
    super(connector)

    Object.assign(this, data)
  }
}
