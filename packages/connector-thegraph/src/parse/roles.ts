import { Role as RoleDataGql } from "../graphql/types";
import { ConnectorTheGraph, Role } from "plumbery-core";
import ParseBase from './ParseBase'

export class RoleFromRole extends ParseBase {
  static parse(
    connector: ConnectorTheGraph,
    role: RoleDataGql | null | undefined
  ): Role {
    ParseBase.validateData(role, role)

    return new Role({
      name: '?',
      id: role!.id,
      params: '?',
      bytes: role!.hash
    }, connector)
  }
}
