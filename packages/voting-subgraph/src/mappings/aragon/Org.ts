import { BigInt, log } from '@graphprotocol/graph-ts'
import { Meta as MetaEntity } from '../../../generated/schema'
import { DeployDAO as DeployDAOEvent } from '../../../generated/DAOFactory/DAOFactory'
import { Kernel as KernelTemplate } from '../../../generated/templates'

function _getMetaEntity(): MetaEntity {
  let META_ID = '0'

  let metadata = MetaEntity.load(META_ID)

  if (!metadata) {
    metadata = new MetaEntity(META_ID)
    metadata.orgDataSources = []

    metadata.save()
  }

  return metadata!
}

export function handleDeployDAO(event: DeployDAOEvent): void {
  let MAX_ORG_DATASOURCES = 0

  let orgAddress = event.params.dao

  let metadata = _getMetaEntity()
  let orgDataSources = metadata.orgDataSources
  let numOrgDataSourcess = orgDataSources.length

  if (MAX_ORG_DATASOURCES != 0 && numOrgDataSourcess >= MAX_ORG_DATASOURCES) {
    return
  }

  orgDataSources.push(orgAddress.toHexString())

  metadata.orgDataSources = orgDataSources
  metadata.save()

  KernelTemplate.create(orgAddress)
}
