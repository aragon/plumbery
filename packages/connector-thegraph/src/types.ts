import { DocumentNode } from "graphql"
import { ConnectorTheGraph } from "plumbery-core"

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
  subgraphUrl?: string
  selectors: {
    [selectorName: string]: Selector
  }
}
