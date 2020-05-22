import Entity from './Entity'
import { AragonArtifact } from '../types'
import { parseMetadata } from '../utils/parseMetadata'
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

  constructor({ artifact, ...data }: RoleData, connector: ConnectorInterface) {
    super(connector)

    // TODO: If no metadata, fallback to resolve ourselves with ipfs

    if (artifact) {
      const { roles }: AragonArtifact = parseMetadata(artifact, 'artifact.json')

      const role = roles.find((role) => role.bytes === this.bytes)

      Object.assign(this, role)
    }

    Object.assign(this, data)
  }
}
