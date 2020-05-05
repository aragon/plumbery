# Connectors

Connectors implement `IConnector`. A connector contains the mechanism through which the data is going to be fetched.

Three connectors are provided by default, listed below.

## ConnectorTheGraph

A connector that fetches information from a The Graph subgraph.

### Usage

```js
const connection = new AragonPlumbery({
  connector: new ConnectorTheGraph({
    daoSubgraphUrl: 'http://…',
    appSubgraphUrl: (repoId) => {
      return 'http://…'
    },
  }),
})
```

## ConnectorEthereumProvider

A connector that fetches information from a standard Ethereum provider (EIP 1193).

### Usage

```js
const connection = new AragonPlumbery({
  connector: new ConnectorEthereum({
    provider: ethereumProvider,
    appStateReducer: (state, { eventName, appId, repoId }) => {},
  }),
})
```

## ConnectorJson

A connector that read information from a JSON string. Useful for testing / debugging purposes.
