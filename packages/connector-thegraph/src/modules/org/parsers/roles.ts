import { Role as RoleDataGql } from "../queries/types";
import { ConnectorTheGraph, Role } from "plumbery-core";
import { QueryResult } from "packages/connector-thegraph/src/types";

export function parseRole(
  connector: ConnectorTheGraph,
  data: QueryResult
): Role {
  const role = data.role as RoleDataGql

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
