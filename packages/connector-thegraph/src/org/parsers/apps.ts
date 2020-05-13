import { App as AppDataGql } from '../queries/types'
import { Organization as OrganizationDataGql } from "../queries/types";
import { AppData } from 'plumbery-core'
import { QueryResult } from '../../types'

export function parseApp(
  data: QueryResult
): AppData {
  const app = data.app as AppDataGql

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
  data: QueryResult
): AppData[] {
  const org = data.organization as OrganizationDataGql
  const apps = org?.apps

  if (!apps) {
    throw new Error('Unable to parse apps.')
  }

  return apps.map((app: AppDataGql) => {
    return parseApp({ app })
  })
}
