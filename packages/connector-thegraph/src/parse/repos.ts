import { Repo as RepoDataGql } from "../graphql/types";
import { RepoData } from "plumbery-core";

export function parseRepo(
  repo: RepoDataGql | null | undefined
): RepoData {
  if (!repo) {
    throw new Error('Unable to parse repo.')
  }

  return {
    name: repo.name,
    address: repo.address
  }
}
