import { PermissionDataGql } from "../graph-types";
import { Permission, ConnectorTheGraph } from "plumbery-core";

export function parsePermissions(
  connector: ConnectorTheGraph,
  permissions: PermissionDataGql[] | null | undefined
): Permission[] {
  if (!permissions) {
    return []
  }

  return permissions.map((permission: PermissionDataGql) => {
    return new Permission({
      app: permission.app?.address,
      entity: permission.entity,
      role: permission.role.name,
    }, connector)
  })
}