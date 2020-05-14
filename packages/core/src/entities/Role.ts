import Entity from "./Entity"
import { ConnectorInterface } from "../ConnectorTypes"

// TODO: Implement all properties and methods from the API spec (https://github.com/aragon/plumbery/blob/master/docs/role.md).
// [ ] name 	String 	Name of the role. E.g. "Mint tokens".
// [ ] id 	String 	Identifier of the role. E.g. "MINT_ROLE".
// [ ] params 	String[] 	Params associated to the role. E.g. [ "Receiver", "Token amount" ].
// [ ] bytes 	String 	Encoded identifier for the role.

export interface RoleData {
  name: string
  id: string
  params: string
  bytes: string
}

export default class Role extends Entity implements RoleData {
  readonly name!: string
  readonly id!: string
  readonly params!: string
  readonly bytes!: string

  constructor(data: RoleData, connector: ConnectorInterface) {
    super(connector)

    Object.assign(this, data)
  }
}
