import Entity from './Entity'
import { ConnectorInterface } from '../connections/ConnectorInterface'

// TODO: Implement all properties and methods from the API spec (https://github.com/aragon/plumbery/blob/master/docs/role.md).
// [ ] name (ipfs) 	String 	Name of the role. E.g. "Mint tokens".
// [ ] id (ipfs)	String 	Identifier of the role. E.g. "MINT_ROLE".
// [ ] params (ipfs)	String[] 	Params associated to the role. E.g. [ "Receiver", "Token amount" ].
// [x] bytes 	String 	Encoded identifier for the role.
// [x] manager 	String 	Addres of the role manager.

export interface RoleData {
  appAddress: string
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
    // parse artifact and manifest data
  }
}
