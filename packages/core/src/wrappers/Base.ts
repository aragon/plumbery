import { ConnectorInterface } from "../ConnectorTypes";

export default class Base {
  connector: ConnectorInterface

  constructor(connector: ConnectorInterface) {
    this.connector = connector
  }

  public toString(): string {
    const render = {}

    Object.getOwnPropertyNames(this)
      .filter(prop => !prop.includes('_'))
      .map(prop => (render as any)[prop] = (this as any)[prop])

    return JSON.stringify(render, null, 2)
  }
}
