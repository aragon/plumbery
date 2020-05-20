// Import entity types from the schema
import {Repo as RepoEntity, Version as VersionEntity} from '../types/schema'

import {getAppMetadata} from '../helpers/ipfs'

// Import templates types
import {
  NewVersion as NewVersionEvent,
  Repo as RepoContract,
} from '../types/templates/Repo/Repo'

export function handleNewVersion(event: NewVersionEvent): void {
  const repoId = event.address.toHex()
  const repo = RepoEntity.load(repoId)

  if (repo !== null) {
    const repoContract = RepoContract.bind(event.address)
    const versionData = repoContract.getByVersionId(event.params.versionId)

    const codeAddress = versionData.value1
    const contentUri = versionData.value2.toString()
    const semanticVersion = event.params.semanticVersion.toString()

    const versionId = codeAddress
      .toHexString()
      .concat('-')
      .concat(semanticVersion)

    // create new version
    let version = VersionEntity.load(versionId)
    if (version == null) {
      version = new VersionEntity(versionId) as VersionEntity
      version.semanticVersion = semanticVersion
      version.codeAddress = codeAddress
      version.contentUri = contentUri
      version.repoName = repo.name
      version.repoAddress = repo.address
      version.repoNamehash = repo.node
      version.artifact = getAppMetadata(contentUri, 'artifact.json')
      version.manifest = getAppMetadata(contentUri, 'manifest.json')
    }

    repo.lastVersion = version.id

    repo.save()
    version.save()
  }
}
