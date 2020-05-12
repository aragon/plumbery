import { App as AppDataGql } from '../queries/types'
import { Organization as OrganizationDataGql } from "../queries/types";
import { ConnectorTheGraph, App } from 'plumbery-core'
import { QueryResult } from 'packages/connector-thegraph/src/types'

export function parseApp(
  connector: ConnectorTheGraph,
  data: QueryResult
): App {
  const app = data.app as AppDataGql

  if (!app) {
    throw new Error('Unable to parse app.')
  }

  return new App(
    {
      name: app.repoVersion?.repo.name,
      isForwarder: app.isForwarder,
      appId: app.appId,
      address: app.address,
      registryAddress: app.repoVersion?.repo?.registry?.address,
      kernelAddress: app.organization?.address,
      version: app.repoVersion?.semanticVersion.replace(/,/g, '.'),
    },
    connector
  )
}

export function parseApps(
  connector: ConnectorTheGraph,
  data: QueryResult
): App[] {
  const org = data.organization as OrganizationDataGql
  const apps = org?.apps as AppDataGql[]

  if (!apps) {
    throw new Error('Unable to parse apps.')
  }

  return apps.map((app: AppDataGql) => {
    return parseApp(connector, { app })
  })
}
