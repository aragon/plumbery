import { App as AppDataGql } from '../queries/types'
import { Organization as OrganizationDataGql } from "../queries/types";
import { AppData } from 'plumbery-core'
import { QueryResult } from '../../types'

function _parseApp(app: AppDataGql): AppData {
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

export function parseApp(
  result: QueryResult
): AppData {
  const app = result.data.app as AppDataGql

  if (!app) {
    throw new Error('Unable to parse app.')
  }

  return _parseApp(app)
}

export function parseApps(
  result: QueryResult
): AppData[] {
  const org = result.data.organization as OrganizationDataGql
  const apps = org?.apps

  if (!apps) {
    throw new Error('Unable to parse apps.')
  }

  return apps.map((app: AppDataGql) => {
    return _parseApp(app)
  })
}
