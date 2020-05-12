import { DocumentNode } from "graphql"
import { ConnectorTheGraph } from "plumbery-core"
import { Client } from "@urql/core"

export type DataGql = any

export type QueryResult = any

export type ParseFunction = (
  connector: ConnectorTheGraph,
  data: QueryResult
) => {}

export type Selector = {
  query: DocumentNode
  parser: ParseFunction
}

export type Module = {
  client?: Client
  selectors: {
    [selectorName: string]: Selector
  }
}
