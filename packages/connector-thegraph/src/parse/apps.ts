import { App as AppDataGql } from '../graphql/types'
import { AppData } from 'plumbery-core'

export function parseApp(
  app: AppDataGql | null | undefined
): AppData {
  if (!app) {
    throw new Error('Unable to parse app.')
  }

  return {
    name: app.repoVersion?.repo.name,
    isForwarder: app.isForwarder,
    appId: app.appId,
    address: app.address,
    registryAddress: app.repoVersion?.repo?.registry?.address,
    kernelAddress: app.organization?.address,
    version: app.repoVersion?.semanticVersion.replace(/,/g, '.'),
  }
}

export function parseApps(
  apps: AppDataGql[] | null | undefined
): AppData[] {
  if (!apps) {
    throw new Error('Unable to parse apps.')
  }

  return apps.map((app: AppDataGql) => {
    return parseApp(app)
  })
}
