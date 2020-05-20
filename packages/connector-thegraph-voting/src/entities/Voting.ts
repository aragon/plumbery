import VotingEntity from "./VotingEntity";
import VotingVote from "./VotingVote";
import VotingConnectorTheGraph from "../connector";
import { App } from "plumbery-core";

export default class Voting extends VotingEntity {
  readonly app: App

  constructor(app: App, subgraphUrl: string) {
    super(new VotingConnectorTheGraph(subgraphUrl))

    this.app = app
  }

  async votes(): Promise<VotingVote[]> {
    return this._connector.votesForApp(this.app.address)
  }
}