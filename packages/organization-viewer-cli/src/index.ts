import { aragonConnect, ConnectorJson } from 'plumbery-core'
import jsonData from './org-data.json'

async function main() {
  const connector = new ConnectorJson(jsonData)
  const connection = aragonConnect(connector)
  const org = connection.organization('governance.aragonproject.eth')
}

main()
