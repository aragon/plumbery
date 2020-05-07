# Plumbery

This is the base class of the library. It holds a connector, which is responsible of fetching the data.

Note: “Plumbery” is a code name used during the development of this project and will change in the future.

## Constructor

| Name               | Type                                      | Description                                                                                              |
| ------------------ | ----------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| `config`           | `Object`                                  | The main configuration object                                                                            |
| `config.connector` | `Connector \| [String, Object] \| String` | Accepts a `Connector` instance, and either a string or a tuple for embedded connectors and their config. |
| `config.signer`    | `EthereumProvider`                        | An Ethereum provider (EIP 1193) used to sign and submit transactions.                                    |

### Example

```js
const plumbery = new Plumbery({
  connector: 'thegraph',
  signer: window.ethereum,
})
```

## Methods

### Plumbery#organization(location)

Returns an `Organization` at `location`.

| Name       | Type           | Description                                                   |
| ---------- | -------------- | ------------------------------------------------------------- |
| `location` | `String`       | The Ethereum address or ENS domain of an Aragon organization. |
| returns    | `Organization` | An `Organization` instance.                                   |

#### Example

```js
const myorg = connection.organization('myorg.aragonid.eth')
```

### Plumbery#setSigner(ethereum)

Updates the Ethereum provider used to sign transactions. Pass `null` to remove.

| Parameter  | Type                       | Description                                                            |
| ---------- | -------------------------- | ---------------------------------------------------------------------- |
| `ethereum` | `EthereumProvider \| null` | The Ethereum provider (EIP 1193) used to sign and submit transactions. |
