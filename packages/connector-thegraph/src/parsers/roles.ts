import { RoleData } from '@aragon/connect'
import { App as AppDataGql } from '../queries/types'
import { Role as RoleDataGql } from '../queries/types'
import { QueryResult } from '../types'

function _parseRole(role: RoleDataGql, artifact?: string | null): RoleData {
  return {
    appAddress: role.appAddress,
    manager: role.manager,
    hash: role.roleHash,
    artifact,
  }
}

export function parseRole(result: QueryResult): RoleData {
  const role = result.data.role as RoleDataGql

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
    return _parseRole(role, app.version?.artifact)
  })
}
