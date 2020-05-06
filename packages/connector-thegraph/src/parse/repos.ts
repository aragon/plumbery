import { RepoDataGql } from "../graphql/types";
import { ConnectorTheGraph, Repo } from "plumbery-core";

export function parseRepo(
  connector: ConnectorTheGraph,
  repo: RepoDataGql | null | undefined
): Repo {
  if (!repo) {
    throw new Error('Unable to find repo.')
  }

  return new Repo({
    name: repo.name,
    address: repo.address
  }, connector)
}
