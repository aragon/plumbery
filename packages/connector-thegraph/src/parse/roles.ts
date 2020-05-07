import { Role as RoleDataGql } from "../graphql/types";
import { ConnectorTheGraph, Role } from "plumbery-core";

export function parseRole(
  connector: ConnectorTheGraph,
  role: RoleDataGql | null | undefined
): Role {
  if (!role) {
    throw new Error('Unable to parse role.')
  }

  return new Role({
    name: '?',
    id: role.id,
    params: '?',
    bytes: role.hash
  }, connector)
}
