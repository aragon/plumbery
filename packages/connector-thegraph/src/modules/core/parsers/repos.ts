import { App as AppDataGql } from "../queries/types";
import { Repo as RepoDataGql } from "../queries/types";
import { ConnectorTheGraph, Repo } from "plumbery-core";
import { QueryResult } from "packages/connector-thegraph/src/types";

export function parseRepo(
  connector: ConnectorTheGraph,
  data: QueryResult
): Repo {
  const app = data.app as AppDataGql
  const repo = app.repoVersion?.repo as RepoDataGql

  if (!repo) {
    throw new Error('Unable to parse repo.')
  }

  return new Repo({
    name: repo.name,
    address: repo.address
  }, connector)
}
