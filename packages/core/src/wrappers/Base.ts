import { ConnectorInterface } from "../ConnectorTypes";

export default class Base {
  protected _connector: ConnectorInterface

  constructor(connector: ConnectorInterface) {
    this._connector = connector
  }
}