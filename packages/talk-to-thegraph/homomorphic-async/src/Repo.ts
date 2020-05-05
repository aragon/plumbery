import { RepoData } from "./graph-types";
import Client from "./client";
import { Base } from "./Base";

export class Repo extends Base {
  public address: string
  public name?: string

  private _data: RepoData

  constructor(data: RepoData, client: Client) {
    super(client)

    this._data = data

    this.address = data.address
    this.name = data.name
  }
}
