import ConnectorEthereum from 'plumbery-connector-ethereum'
import ConnectorTheGraph from 'plumbery-connector-thegraph'
import ConnectorJson from './ConnectorJson'
import { ConnectorInterface } from './ConnectorTypes'
import Connection from './Connection'

declare global {
  interface Window {
    ethereum: any
  }
}

function getConnector(connector) {
  if (!Array.isArray(connector)) {
    return connector
  }

  const [name, config = {}] = connector

  if (name === 'json') {
    return new ConnectorJson(config)
  }
  if (name === 'thegraph') {
    return new ConnectorTheGraph(config)
  }
  if (name === 'ethereum') {
    return new ConnectorEthereum(config)
  }

  throw new Error(`Unsupported connector name: ${name}`)
}

type EthereumProvider = any

function getSigner(signer: EthereumProvider) {
  if (signer) {
    return signer
  }
  if (typeof window !== 'undefined' && window.ethereum) {
    return window.ethereum
  }

  throw new Error(
    `No signer provided, and aragonConnect() couldn’t detect one.`
  )
}

function aragonConnect({
  connector,
  signer,
}: {
  connector: ConnectorInterface | [string, object | undefined]
  signer: object | undefined
}) {
  return new Connection(getConnector(connector), getSigner(signer))
}

export default aragonConnect
