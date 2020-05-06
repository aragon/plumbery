import { Permission } from 'plumbery-core'
import { OrganizationDataGql, PermissionDataGql } from './graph-types'
import { Client } from '@urql/core'
import { PermissionData } from 'plumbery-core/dist/wrappers/Permission'

export default async function fetchPermissions(
  orgAddress: string,
  client: Client
): Promise<Permission[]> {
  const query = `
    query {
      organization(id: "${orgAddress}") {
        acl {
          permissions {
            app {
              address
            }
            entity
            role {
              name
            }
          }
        }
      }
    }
  `

  const results = await client.query(query).toPromise()
  const org = results.data.organization as OrganizationDataGql

  if (!org.acl?.permissions) {
    return []
  }

  return org.acl.permissions.map((permission: PermissionDataGql) => {
    const data: PermissionData = {
      app: permission.app?.address,
      entity: permission.entity,
      role: permission.role.name,
    }

    return new Permission(data)
  })
}
