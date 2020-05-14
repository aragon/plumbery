import VotingEntity from "./VotingEntity";
import Vote from "./Vote";
import VotingConnectorTheGraph from "..";
import { App } from "plumbery-core";

export default class Voting extends VotingEntity {
  readonly app: App

  constructor(app: App, subgraphUrl: string) {
    super(new VotingConnectorTheGraph(subgraphUrl))

    this.app = app
  }

  async votes(): Promise<Vote[]> {
    return this._connector.votesForApp(this.app.address)
  }
}