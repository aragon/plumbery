# The Graph Connector for Aragon Plumbery

## Usage

```js
const connection = new AragonPlumbery({
  connector: new ConnectorTheGraph({
    daoSubgraphUrl: 'http://…',
    appSubgraphUrl: repoId => {
      return 'http://…'
    },
  }),
})
```
