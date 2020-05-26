import { DeployDao as DeployDaoEvent } from '../../generated/company-template.aragonpm.eth@1.0.0/DAOTemplate'
import { DeployToken as DeployTokenEvent } from '../../generated/company-template.aragonpm.eth@1.0.0/DAOTemplate'
import { InstalledApp as InstalledAppEvent } from '../../generated/company-template.aragonpm.eth@1.0.0/DAOTemplate'
import { SetupDao as SetupDaoEvent } from '../../generated/company-template.aragonpm.eth@1.0.0/DAOTemplate'
import { Org as OrgEntity } from '../../generated/schema'
import { App as AppEntity } from '../../generated/schema'
import { Token as TokenEntity } from '../../generated/schema'

export function handleDeployDao(event: DeployDaoEvent): void {
  let orgAddress = event.params.dao

  let org = new OrgEntity(orgAddress.toHexString())
  org.address = orgAddress

  org.save()
}

export function handleDeployToken(event: DeployTokenEvent): void {
  let tokenAddress = event.params.token

  let token = new TokenEntity(tokenAddress.toHexString())
  token.address = tokenAddress

  token.save()
}

export function handleInstalledApp(event: InstalledAppEvent): void {
  let appAddress = event.params.appProxy
  let appId = event.params.appId

  let app = new AppEntity(appAddress.toHexString())
  app.address = appAddress
  app.appId = appId

  app.save()
}

export function handleSetupDao(event: SetupDaoEvent): void {}
