import { Permission as PermissionDataGql } from "../graphql/types";
import { Permission, ConnectorTheGraph } from "plumbery-core";
import ParseBase from './ParseBase'

export class ParsePermissionsFromOrg extends ParseBase {
  constructor() {
    super('OrgDataGql', 'Permission')
  }

  parseImplementation(connector: ConnectorTheGraph, permissions: PermissionDataGql[]): Permission[] {
    return permissions.map((permission: PermissionDataGql) => {
      return new Permission({
        app: permission.app?.address,
        entity: permission.entity,
        role: permission.role.hash,
        id: permission.id
      }, connector)
    })
  }
}
