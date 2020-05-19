import ConnectorEthereum, {
  ConnectorEthereumConfig,
} from 'plumbery-connector-ethereum'
import ConnectorTheGraph, {
  ConnectorTheGraphConfig,
} from 'plumbery-connector-thegraph'
import Connection from './Connection'
import ConnectorJson, { ConnectorJsonConfig } from './ConnectorJson'
import { ConnectorInterface } from './ConnectorInterface'
import { SignerType } from '../SignerTypes'

declare global {
  interface Window {
    ethereum: any
  }
}

type ConnectorDeclaration = ConnectorInterface | [string, object | undefined]

function getConnector(connector: ConnectorDeclaration): ConnectorInterface {
  if (!Array.isArray(connector)) {
    return connector
  }

  const [name, config = {}] = connector

  if (name === 'json') {
    return new ConnectorJson(<ConnectorJsonConfig>config)
  }
  if (name === 'thegraph') {
    return new ConnectorTheGraph(<ConnectorTheGraphConfig>config)
  }
  if (name === 'ethereum') {
    return new ConnectorEthereum(<ConnectorEthereumConfig>config)
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
  connector: ConnectorDeclaration
  signer: SignerType | undefined
}) {
  return new Connection(getConnector(connector), getSigner(signer))
}

export default aragonConnect
