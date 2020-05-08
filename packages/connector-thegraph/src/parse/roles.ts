import { Role as RoleDataGql } from "../graphql/types";
import { ConnectorTheGraph, Role } from "plumbery-core";
import ParseBase from './ParseBase'

export class ParseRoleFromRole extends ParseBase {
  constructor() {
    super('RoleDataGql', 'Role')
  }

  parseImplementation(connector: ConnectorTheGraph, role: RoleDataGql): Role {
    return new Role({
      name: '?',
      id: role.id,
      params: '?',
      bytes: role.hash
    }, connector)
  }
}
