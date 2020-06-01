import { DeployDao as DeployDaoEvent } from '../../../generated/bare-template.aragonpm.eth@1.0.0/DAOTemplate'
import * as aragon from '../aragon'

export function handleDeployDao(event: DeployDaoEvent): void {
  aragon.processOrg(event.params.dao)
}

export function handleInstalledApp(): void {}
export function handleSetupDao(): void {}
export function handleDeployToken(): void {}
