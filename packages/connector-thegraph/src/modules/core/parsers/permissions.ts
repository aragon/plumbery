import { Organization as OrganizationDataGql } from "../queries/types";
import { Permission as PermissionDataGql } from "../queries/types";
import { Permission, ConnectorTheGraph } from "plumbery-core";
import { QueryResult } from "packages/connector-thegraph/src/types";

export function parsePermissions(
  connector: ConnectorTheGraph,
  data: QueryResult
): Permission[] {
  const org = data.organization as OrganizationDataGql
  const permissions = org?.permissions as PermissionDataGql[]

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
