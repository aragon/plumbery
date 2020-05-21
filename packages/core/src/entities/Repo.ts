import Entity from './Entity'
import {
  AragonArtifact,
  AragonManifest,
  AragonEnvironments,
  AragonArtifactRole,
} from '../types'
import { ConnectorInterface } from '../connections/ConnectorInterface'

// TODO: Implement all properties and methods from the API spec (https://github.com/aragon/plumbery/blob/master/docs/repo.md).
// [x] author 	String 	Author of the app. E.g. "Aragon Association".
// [ ] changelogUrl 	String 	URL of the app versions changelog.
// [x] descriptionUrl 	String 	URL pointing to the long description of the app.
// [x] description 	String 	Description of the app. E.g. "Manage an organization’s token supply and distribution.".
// [x] environments 	{ [chainId]: { registry: String, appName: String, chainId: String } } 	Environments supported by the app.
// [ ] icons 	{ src: String, sizes: String }[] 	Icons of the app (follows the web app manifest icons format).
// [x] name 	String 	Name of the app. E.g. "Tokens".
// [ ] roles 	Role[] 	Roles supported by the app.
// [ ] screenshots 	String[] 	Array of screenshots for the app.
// [ ] sourceUrl 	String 	URL for the source code of the app.

export interface RepoData {
  address: string
  artifact?: string | null
  contentUri?: string
  name: string
  manifest?: string | null
}

export default class Repo extends Entity implements RepoData {
  readonly address!: string
  readonly author?: string
  readonly changelogUrl?: string
  readonly descriptionUrl?: string
  readonly description?: string
  readonly environments?: AragonEnvironments
  readonly icons?: { src: string; sizes: string }[]
  readonly name!: string
  readonly roles?: AragonArtifactRole[]
  readonly screenshots?: { src: string }[]
  readonly sourceUrl?: string

  constructor(data: RepoData, connector: ConnectorInterface) {
    super(connector)
    Object.assign(this, data)

    // TODO: If no metadata, fallback to resolve ourselves with ipfs

    if (data.artifact) {
      const artifact: AragonArtifact = JSON.parse(data.artifact)

      this.environments = artifact.environments
      this.roles = artifact.roles
    }

    if (data.manifest) {
      const manifest: AragonManifest = JSON.parse(data.manifest)

      this.author = manifest.author
      this.description = manifest.description
      this.descriptionUrl = manifest.details_url
      this.icons = manifest.icons
      this.screenshots = manifest.screenshots
      this.sourceUrl = manifest.source_url
    }
  }
}
