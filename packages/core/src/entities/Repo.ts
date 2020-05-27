import Entity from './Entity'
import {
  AragonArtifact,
  AragonManifest,
  AragonEnvironments,
  AragonArtifactRole,
} from '../types'
import { ConnectorInterface } from '../connections/ConnectorInterface'

export interface RepoData {
  address: string
  artifact?: string | null
  contentUri?: string | null
  name: string
  manifest?: string | null
  registry?: string | null
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
  readonly registry!: string
  readonly roles?: AragonArtifactRole[]
  readonly screenshots?: { src: string }[]
  readonly sourceUrl?: string

  constructor(
    { artifact, manifest, ...data }: RepoData,
    connector: ConnectorInterface
  ) {
    super(connector)

    // TODO: If no metadata, fallback to resolve ourselves with ipfs

    if (artifact) {
      const { environments, roles }: AragonArtifact = JSON.parse(artifact)

      this.environments = environments
      this.roles = roles
    }

    if (manifest) {
      const {
        author,
        changelog_url: changelogUrl,
        description,
        details_url: descriptionUrl,
        icons,
        screenshots,
        source_url: sourceUrl,
      }: AragonManifest = JSON.parse(manifest)

      this.author = author
      this.changelogUrl = changelogUrl
      this.description = description
      this.descriptionUrl = descriptionUrl
      this.icons = icons
      this.screenshots = screenshots
      this.sourceUrl = sourceUrl
    }

    Object.assign(this, data)
  }
}
