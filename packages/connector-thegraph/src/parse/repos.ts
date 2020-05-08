import { App as AppDataGql } from "../graphql/types";
import { ConnectorTheGraph, Repo } from "plumbery-core";
import ParseBase from './ParseBase'

export class RepoFromApp extends ParseBase {
  static parse(
    connector: ConnectorTheGraph,
    app: AppDataGql | null | undefined
  ): Repo {
    const repo = app?.repoVersion?.repo
    ParseBase.validateData(app, repo)

    return new Repo({
      name: repo!.name,
      address: repo!.address
    }, connector)
  }
}
