import { Permission, ConnectorTheGraph } from 'plumbery-core'
import { OrganizationDataGql, PermissionDataGql } from '../../graph-types'
import { Client } from '@urql/core'

export default async function fetchPermissionsForOrg(
  orgAddress: string,
  client: Client,
  connector: ConnectorTheGraph
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
    return new Permission({
      app: permission.app?.address,
      entity: permission.entity,
      role: permission.role.name,
    }, connector)
  })
}
