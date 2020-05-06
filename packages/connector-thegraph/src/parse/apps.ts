import { AppDataGql } from "../graph-types";
import { ConnectorTheGraph, App } from "plumbery-core";

export function parseApp(
  connector: ConnectorTheGraph,
  app: AppDataGql
): App {
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
    return []
  }

  return apps.map((app: AppDataGql) => {
    return parseApp(connector, app)
  })
}