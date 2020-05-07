import { ConnectorInterface } from "../ConnectorTypes";

export default class Base {
  protected _connector: ConnectorInterface

  constructor(connector: ConnectorInterface) {
    this._connector = connector
  }

  public describe(): string {
    return Object.getOwnPropertyNames(this)
      .filter(prop => !prop.includes('_'))
      .map(prop => `  ${prop}: ${(this as any)[prop]}`)
      .join('\n')
  }
}
