import { Role as RoleDataGql } from "../graphql/types";
import { RoleData } from "plumbery-core";

export function parseRole(
  role: RoleDataGql | null | undefined
): RoleData {
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
