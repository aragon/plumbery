import { OrganizationData } from "./graph-types";
import Client from "./client";
import { App } from "./App";
import { Base } from "./Base";

export class Organization extends Base {
  public address: string

  private _data: OrganizationData

  private _apps?: App[] = undefined

  constructor(data: OrganizationData, client: Client) {
    super(client)

    this._data = data

    this.address = data.address
  }

  get apps(): Promise<App[]> {
    return (async () => await this._getApps())()
  }

  private async _getApps(): Promise<App[]> {
    if (!this._apps) {
      const query = `
        query {
          organizations(where: {
            address: "${this.address}"
          }) {
            apps {
              address
            }
          }
        }
      `

      const result = await this._client.query(query)
      const orgData = result.data.organizations[0] as OrganizationData

      this._apps = orgData.apps!.map(appData => {
        return new App(appData, this._client)
      })
    }

    return this._apps
  }
}