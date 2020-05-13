import { App as AppDataGql } from "../queries/types";
import { Repo as RepoDataGql } from "../queries/types";
import { RepoData } from "plumbery-core";
import { QueryResult } from "../../types";

export function parseRepo(
  data: QueryResult
): RepoData {
  const app = data.app as AppDataGql
  const repo = app.repoVersion?.repo as RepoDataGql

  if (!repo) {
    throw new Error('Unable to parse repo.')
  }

  return {
    name: repo.name,
    address: repo.address
  }
}
