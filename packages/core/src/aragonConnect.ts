import { ConnectorInterface } from './ConnectorTypes'
import Connection from './Connection'

type ConnectorArg = ConnectorInterface | string

function aragonConnect({
  connector,
}: {
  connector?: ConnectorInterface | string
} = {}) {
  const connection = new Connection(connector)
  return connection
}

export default aragonConnect
