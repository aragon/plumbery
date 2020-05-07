import { Permission as PermissionDataGql } from "../graphql/types";
import { Permission, ConnectorTheGraph } from "plumbery-core";

export function parsePermissions(
  connector: ConnectorTheGraph,
  permissions: PermissionDataGql[] | null | undefined
): Permission[] {
  if (!permissions) {
    throw new Error('Unable to parse permissions.')
  }

  return permissions.map((permission: PermissionDataGql) => {
    return new Permission({
      app: permission.app?.address,
      entity: permission.entity,
      role: permission.role.hash,
      id: permission.id
    }, connector)
  })
}
