import {
  Organization as OrganizationDataGql,
  Permission as PermissionDataGql
} from "../graphql/types";
import { Permission, ConnectorTheGraph } from "plumbery-core";
import ParseBase from './ParseBase'

export class PermissionsFromOrg extends ParseBase {
  static parse(
    connector: ConnectorTheGraph,
    org: OrganizationDataGql | null | undefined
  ): Permission[] {
    const permissions = org?.permissions
    ParseBase.validateData(org, permissions)

    return permissions!.map((permission: PermissionDataGql) => {
      return new Permission({
        app: permission.app?.address,
        entity: permission.entity,
        role: permission.role.hash,
        id: permission.id
      }, connector)
    })
  }
}
