import { ethers } from 'ethers'

import ConnectorEthereum, {
  ConnectorEthereumConfig,
} from 'plumbery-connector-ethereum'
import ConnectorTheGraph, {
  ConnectorTheGraphConfig,
} from 'plumbery-connector-thegraph'
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
    readProvider,
    chainId,
    ipfs,
    ensRegistry,
  }: {
    connector: ConnectorDeclaration
    readProvider?: ethers.providers.Provider
    chainId?: number
    ipfs?: ResolveIpfs
    ensRegistry?: string
  }
): Organization {
  // TODO: Handle ENS names

  return new Organization(
    location,
    getConnector(connector),
    readProvider,
    chainId
  )

  // TODO: support several connections
  // return (location: string): Organization =>
  //   new Organization(location, getConnector(connector), provider)
}

export default Connect
