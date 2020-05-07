import { AppDataGql } from "../graphql/types";
import { ConnectorTheGraph, App } from "plumbery-core";

export function parseApp(
  connector: ConnectorTheGraph,
  app: AppDataGql | null | undefined
): App {
  if (app) {
    throw new Error('Unable to parse app.')
  }

  return new App({
    name: app.repo?.name,
    address: app.address
  }, connector)
}

export function parseApps(
  connector: ConnectorTheGraph,
  apps: AppDataGql[] | null | undefined
): App[] {
  if (!apps) {
    throw new Error('Unable to parse apps.')
  }

  return apps.map((app: AppDataGql) => {
    return parseApp(connector, app)
  })
}
