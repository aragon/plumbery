import { App as AppDataGql } from '../queries/types'
import { Role as RoleDataGql } from '../queries/types'
import { RoleData } from 'plumbery-core'
import { QueryResult } from '../../types'

function _parseRole(role: RoleDataGql): RoleData {
  return {
    appAddress: role.appAddress,
    manager: role.manager,
    bytes: role.nameHash,
  }
}

export function parseRole(result: QueryResult): RoleData {
  const role = result.data.app as RoleDataGql

  if (!role) {
    throw new Error('Unable to parse role.')
  }

  return _parseRole(role)
}

export function parseRoles(result: QueryResult): RoleData[] {
  const app = result.data.app as AppDataGql
  const roles = app?.roles

  if (!roles) {
    throw new Error('Unable to parse roles.')
  }

  return roles.map((role: RoleDataGql) => {
    return _parseRole(role)
  })
}
