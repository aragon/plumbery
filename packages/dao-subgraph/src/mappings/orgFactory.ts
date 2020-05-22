import {Bytes, Address} from '@graphprotocol/graph-ts'

// Import event types from the contract ABI
import {DeployDAO as DeployDAOEvent} from '../types/OrgFactory/DAOFactory'

// Import entity types from the schema
import {
  OrgFactory as FactoryEntity,
  Organization as OrganizationEntity,
  App as AppEntity,
  Implementation as ImplementationEntity,
} from '../types/schema'

// Import templates types
import {Organization as OrganizationTemplate} from '../types/templates'
import {Kernel as KernelContract} from '../types/templates/Organization/Kernel'

import {KERNEL_CORE_APP_ID, KERNEL_CORE_NAMESPACE} from '../helpers/constants'

function addKernelApp(
  kernelProxyAddress: Address,
  kernel: KernelContract,
  org: OrganizationEntity,
): void {
  // handle kernel implementation
  const implementationId = KERNEL_CORE_NAMESPACE.concat('-').concat(
    KERNEL_CORE_APP_ID,
  )
  const implementation = new ImplementationEntity(
    implementationId,
  ) as ImplementationEntity
  implementation.address = kernel.getApp(
    Bytes.fromHexString(KERNEL_CORE_NAMESPACE) as Bytes,
    Bytes.fromHexString(KERNEL_CORE_APP_ID) as Bytes,
  )

  implementation.save()

  // handle kernel implementation
  const app = new AppEntity(kernelProxyAddress.toHex()) as AppEntity
  app.address = kernelProxyAddress
  app.appId = KERNEL_CORE_APP_ID
  app.implementation = implementationId

  const orgApps = org.apps || []
  orgApps.push(app.id)
  org.apps = orgApps

  app.save()
}

export function handleDeployDAO(event: DeployDAOEvent): void {
  let factory = FactoryEntity.load('1')
  const factoryAddress = event.address

  const orgId = event.params.dao.toHexString()
  const orgAddress = event.params.dao

  // if no factory yet, set up empty
  if (factory == null) {
    factory = new FactoryEntity('1')
    factory.address = factoryAddress
    factory.orgCount = 0
    factory.organizations = []
  }
  factory.orgCount = factory.orgCount + 1

  let kernel = KernelContract.bind(orgAddress)

  // create new dao
  const org = new OrganizationEntity(orgId) as OrganizationEntity
  org.address = orgAddress
  org.recoveryVault = kernel.getRecoveryVault()
  org.acl = kernel.acl()

  // add kernel app
  addKernelApp(orgAddress, kernel, org)

  // add the org to the factory
  const currentOrganizations = factory.organizations
  currentOrganizations.push(org.id)
  factory.organizations = currentOrganizations

  // save to the store
  factory.save()
  org.save()

  OrganizationTemplate.create(orgAddress)
}
