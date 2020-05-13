import { Permission as PermissionDataGql } from "../graphql/types";
import { PermissionData } from "plumbery-core";

export function parsePermissions(
  permissions: PermissionDataGql[] | null | undefined
): PermissionData[] {
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
