import Entity from './Entity'
import { AragonArtifact } from '../types'
import { ConnectorInterface } from '../connections/ConnectorInterface'

export interface RoleData {
  appAddress: string
  artifact?: string | null
  bytes: string
  manager?: string
}

export default class Role extends Entity implements RoleData {
  readonly appAddress!: string
  readonly bytes!: string
  readonly id?: string
  readonly name?: string
  readonly manager?: string
  readonly params?: string

  constructor(data: RoleData, connector: ConnectorInterface) {
    super(connector)
    Object.assign(this, data)

    // TODO: If no metadata, fallback to resolve ourselves with ipfs

    if (data.artifact) {
      const artifact: AragonArtifact = JSON.parse(data.artifact)

      const role = artifact.roles.find((role) => role.bytes === this.bytes)

      Object.assign(this, role)
    }
  }
}
