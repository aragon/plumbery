import { DeployDao as DeployDaoEvent } from '../../generated/bare-template.aragonpm.eth@1.0.0/DAOTemplate'
import { processOrg } from './helpers/aragon'

export function handleDeployDao(event: DeployDaoEvent): void {
  processOrg(event.params.dao)
}

export function handleInstalledApp(): void {}
export function handleSetupDao(): void {}
export function handleDeployToken(): void {}
