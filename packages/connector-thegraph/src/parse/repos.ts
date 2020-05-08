import { Repo as RepoDataGql } from "../graphql/types";
import { ConnectorTheGraph, Repo } from "plumbery-core";
import ParseBase from './ParseBase'

export class ParseRepoFromApp extends ParseBase {
  constructor() {
    super('AppDataGql', 'Repo')
  }

  parseImplementation(connector: ConnectorTheGraph, repo: RepoDataGql): Repo {
    return new Repo({
      name: repo.name,
      address: repo.address
    }, connector)
  }
}
