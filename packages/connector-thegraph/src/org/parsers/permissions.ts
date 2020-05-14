import { Organization as OrganizationDataGql } from "../queries/types";
import { Permission as PermissionDataGql } from "../queries/types";
import { PermissionData } from "plumbery-core";
import { QueryResult } from "../../types";

export function parsePermissions(
  result: QueryResult
): PermissionData[] {
  const org = result.data.organization as OrganizationDataGql
  const permissions = org?.permissions as PermissionDataGql[]

  if (!permissions) {
    throw new Error('Unable to parse permissions.')
  }

  return permissions.map((permission: PermissionDataGql) => {
    return {
      app: permission.app?.address,
      entity: permission.entity,
      role: permission.role.hash,
      id: permission.id
    }
  })
}
