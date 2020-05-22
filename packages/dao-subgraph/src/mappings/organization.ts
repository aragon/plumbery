import {resolveRepo} from '../helpers/ens'

// Import entity types from the schema
import {
  Organization as OrganizationEntity,
  Repo as RepoEntity,
  App as AppEntity,
  Implementation as ImplementationEntity,
} from '../types/schema'

// Import templates types
import {Acl as AclTemplate} from '../types/templates'
import {AppProxyForwarder as AppProxyForwarderContract} from '../types/templates/Organization/AppProxyForwarder'

import {
  NewAppProxy as NewAppProxyEvent,
  SetApp as SetAppEvent,
} from '../types/templates/Organization/Kernel'

import {
  KERNEL_DEFAULT_ACL_APP_ID,
  KERNEL_APP_BASES_NAMESPACE,
  KERNEL_CORE_NAMESPACE,
} from '../helpers/constants'

export function handleNewProxyApp(event: NewAppProxyEvent): void {
  const orgId = event.address.toHex()
  const org = OrganizationEntity.load(orgId)

  const proxy = event.params.proxy.toHex()
  const appId = event.params.appId.toHex()
  const isUpgradeable = event.params.isUpgradeable

  // Create ACL template
  if (appId == KERNEL_DEFAULT_ACL_APP_ID) {
    AclTemplate.create(event.params.proxy)
  }

  // Create app
  let app = AppEntity.load(proxy)
  if (app == null) {
    // Check if app is forwarder
    let isForwarder: boolean
    const appForwarder = AppProxyForwarderContract.bind(event.params.proxy)
    let callForwarderResult = appForwarder.try_isForwarder()
    if (callForwarderResult.reverted) {
      isForwarder = false
    } else {
      isForwarder = callForwarderResult.value
    }

    // Generate implementation id
    const implementation = KERNEL_APP_BASES_NAMESPACE.concat('-').concat(appId)

    app = new AppEntity(proxy) as AppEntity
    app.address = event.params.proxy
    app.appId = appId
    app.isForwarder = isForwarder
    app.isUpgradeable = isUpgradeable
    app.implementation = implementation
    // Use ens to resolve repo
    const repoId = resolveRepo(event.params.appId)
    if (repoId) {
      const repo = RepoEntity.load(repoId)
      if (repo !== null) {
        app.version = repo.lastVersion
        app.repo = repo.id
        app.repoName = repo.name
        app.repoAddress = repo.address
      }
    }
  }

  const orgApps = org.apps || []
  orgApps.push(app.id)
  org.apps = orgApps

  app.save()
  org.save()
}

export function handleSetApp(event: SetAppEvent): void {
  const namespace = event.params.namespace.toHex()
  // Update if in the APP_BASE or CORE_BASE namespace
  if (
    namespace == KERNEL_APP_BASES_NAMESPACE ||
    namespace == KERNEL_CORE_NAMESPACE
  ) {
    const appId = event.params.appId.toHex()

    // Generate implementation id
    const implementationId = namespace.concat('-').concat(appId)

    // Create implementation
    let implementation = ImplementationEntity.load(implementationId)
    if (implementation == null) {
      implementation = new ImplementationEntity(
        implementationId,
      ) as ImplementationEntity
    }
    implementation.address = event.params.app

    implementation.save()
  }
}
