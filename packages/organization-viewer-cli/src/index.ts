import { aragonConnect } from 'plumbery-core'
import data from './org-data.json'

async function main() {
  // Initiate the connection
  const connection = aragonConnect({
    connector: ['json', { data }],
    signer: {},
  })

  // Get an Organization instance
  const org = connection.organization('governance.aragonproject.eth')

  // Get the permissions set on the organization
  const permissions = await org.permissions()

  logPermissions(permissions)
}

function logPermissions(permissions) {
  console.log('')
  console.log('Permissions')
  console.log('===========')

  for (const [app, roles] of permissions) {
    console.log('')
    console.log(`${app}:`)
    for (const [role, entities] of roles) {
      console.log(`  ${role}:`, entities.join(', '))
    }
  }
}

main()
