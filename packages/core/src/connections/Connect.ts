import ConnectorEthereum, {
  ConnectorEthereumConfig,
} from '@aragon/connect-ethereum'
import ConnectorTheGraph, {
  ConnectorTheGraphConfig,
} from '@aragon/connect-thegraph'
import ConnectorJson, { ConnectorJsonConfig } from './ConnectorJson'
import Organization from '../entities/Organization'
import { ConnectorInterface } from './ConnectorInterface'

type ConnectorDeclaration = ConnectorInterface | [string, object | undefined]

function getConnector(connector: ConnectorDeclaration): ConnectorInterface {
  if (!Array.isArray(connector)) {
    return connector
  }

  const [name, config = {}] = connector

  if (name === 'json') {
    return new ConnectorJson(config as ConnectorJsonConfig)
  }
  if (name === 'thegraph') {
    return new ConnectorTheGraph(config as ConnectorTheGraphConfig)
  }
  if (name === 'ethereum') {
    return new ConnectorEthereum(config as ConnectorEthereumConfig)
  }

  throw new Error(`Unsupported connector name: ${name}`)
}

type ResolveIpfs = (ipfsIdentifier: string, path: string) => string
// type ResolveOrganization = (location: string) => Organization

export function Connect(
  location: string,
  {
    connector,
    ipfs,
    ensRegistry,
  }: {
    connector: ConnectorDeclaration
    ipfs?: ResolveIpfs
    ensRegistry?: string
  }
): Organization {
  // TODO: Handle ENS names

  return new Organization(location, getConnector(connector))

  // TODO: support several connections
  // return (location: string): Organization =>
  //   new Organization(location, getConnector(connector))
}

export default Connect
