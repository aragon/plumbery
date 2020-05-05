import { AppData, OrganizationData, RepoData } from "./graph-types";
import Client from "./client";
import { Base } from "./Base";
import { Repo } from "./Repo";

export class App extends Base {
  public address: string

  private _data: AppData

  private _repo?: Repo

  constructor(data: AppData, client: Client) {
    super(client)

    this._data = data

    this.address = data.address
  }

  get repo(): Promise<Repo | undefined> {
    return (async () => await this._getRepo())()
  }

  private async _getRepo(): Promise<Repo | undefined> {
    if (!this._repo) {
      const query = `
        query {
          apps(where: {
            address: "${this.address}"
          }) {
            repo {
              address
              name
            }
          }
        }
      `

      const result = await this._client.query(query)
      const repoData = result.data.apps[0].repo as RepoData

      if (repoData) {
        this._repo = new Repo(repoData, this._client)
      }
    }

    return this._repo
  }
}

