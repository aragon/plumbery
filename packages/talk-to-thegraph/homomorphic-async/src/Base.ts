import Client from "./client";

export class Base {
  protected _client: Client

  constructor(client: Client) {
    this._client = client
  }
}

