import {
  App as AppDataGql,
  Organization as OrganizationDataGql,
} from '../graphql/types'
import { ConnectorTheGraph, App } from 'plumbery-core'
import ParseBase from './ParseBase'

export class AppFromApp extends ParseBase {
  static parse(
    connector: ConnectorTheGraph,
    app: AppDataGql | null | undefined
  ): App {
    ParseBase.validateData(app, app)

    return new App({
        name: app!.repoVersion?.repo.name,
        isForwarder: app!.isForwarder,
        appId: app!.appId,
        address: app!.address,
        registryAddress: app!.repoVersion?.repo?.registry?.address,
        kernelAddress: app!.organization?.address,
        version: app!.repoVersion?.semanticVersion.replace(/,/g, '.'),
      },
      connector
    )
  }
}

export class AppsFromOrg extends ParseBase {
  static parse(
    connector: ConnectorTheGraph,
    org: OrganizationDataGql | null | undefined
  ): App[] {
    const apps = org?.apps
    ParseBase.validateData(org, org?.apps)

    return apps!.map((app: AppDataGql) => {
      return AppFromApp.parse(connector, app)
    })
  }
}
