import { aragonConnect, ConnectorJson } from 'plumbery-core'
import data from './org-data.json'

async function main() {

  const connection = aragonConnect({
    connector: ['json', { data }],
    signer: {},
  })

  const org = connection.organization('governance.aragonproject.eth')

  console.log('Permissions:')
  console.log(await org.permissions())
}

main()
