import { App as AppDataGql } from '../graphql/types'
import { ConnectorTheGraph, App } from 'plumbery-core'
import ParseBase from './ParseBase'

export class ParseAppFromApp extends ParseBase {
  constructor() {
    super('AppDataGql', 'App')
  }

  parseImplementation(connector: ConnectorTheGraph, app: AppDataGql): App {
    return new App({
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
}

export class ParseAppsFromOrg extends ParseBase {
  constructor() {
    super('OrgDataGql', 'App')
  }

  parseImplementation(connector: ConnectorTheGraph, apps: AppDataGql[]): App[] {
    return apps.map((app: AppDataGql) => {
      return new ParseAppFromApp().parse(connector, app, app)
    })
  }
}
