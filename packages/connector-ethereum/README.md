# Ethereum Connector for Aragon Plumbery

## Usage

```
const connection = new AragonPlumbery({
  connector: new ConnectorEthereum({
    provider: ethereumProvider,
    appStateReducer: (state, { eventName, appId, repoId }) => {},
  }),
})
```
