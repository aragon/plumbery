import { App as AppDataGql } from '../graphql/types'
import { ConnectorTheGraph, App } from 'plumbery-core'

export function parseApp(
  connector: ConnectorTheGraph,
  app: AppDataGql | null | undefined
): App {
  if (!app) {
    throw new Error('Unable to parse app.')
  }

  return new App(
    {
      name: app.repoVersion?.repo.name || 'unknown',
      isForwarder: app.isForwarder,
      appId: app.appId,
      address: app.address,
      registryAddress: app.repoVersion?.repo?.registry?.address,
      kernelAddress: app.organization?.address,
      version: app.repoVersion?.semanticVersion.replace(/,/g, '.') || 'unknown',
    },
    connector
  )
}

export function parseApps(
  connector: ConnectorTheGraph,
  apps: AppDataGql[] | null | undefined
): App[] {
  if (!apps) {
    throw new Error('Unable to parse apps.')
  }

  return apps.map((app: AppDataGql) => {
    return parseApp(connector, app)
  })
}
