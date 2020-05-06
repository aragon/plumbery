import { Permission } from 'plumbery-core'
import { OrganizationData, PermissionData } from './graph-types'
import { Client } from '@urql/core'

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
  console.log(results)
  const org = results.data.organization as OrganizationData
  if (!org?.acl?.permissions) {
    return []
  }

  return org.acl.permissions.map((permission: PermissionData) => {
    return {
      app: permission.app?.address,
      entity: permission.entity,
      role: permission.role.name,
    }
  })
}
