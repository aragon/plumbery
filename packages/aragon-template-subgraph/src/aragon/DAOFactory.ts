import { DeployDAO as DeployDAOEvent } from '../../generated/DAOFactory@0.6/DAOFactory'
import { processOrg } from './helpers/aragon'

export function handleDeployDAO(event: DeployDAOEvent): void {
  processOrg(event.params.dao)
}
