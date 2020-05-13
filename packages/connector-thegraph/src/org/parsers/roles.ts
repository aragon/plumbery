import { Role as RoleDataGql } from "../queries/types";
import { RoleData } from "plumbery-core";
import { QueryResult } from "../../types";

export function parseRole(
  data: QueryResult
): RoleData {
  const role = data.role as RoleDataGql

  if (!role) {
    throw new Error('Unable to parse role.')
  }

  return {
    name: '?',
    id: role.id,
    params: '?',
    bytes: role.hash
  }
}
