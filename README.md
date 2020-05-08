# Plumbery (code name)

## Usage

```js
// Connects to an organization.
const org = await connect('org.aragonid.eth')

// Intents can be converted in a transaction.
const intent = await myOrg.removeApp('0x…')

// Get the transactions for the intent with the current account
const transactions = await intent.transactions(wallet.address)

// Sign the generated transactions
for (const transaction of transactions) {
  await ethers.sendTransaction(transaction.toEthers())
}
```

## Documentation

| Name                                              | Description                                                                                 |
| ------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| [App](docs/app.md)                                | App installed in an organization.                                                           |
| [connect()](docs/connect.md)                      | Connect to organizations.                                                                   |
| [Connectors](docs/connectors.md)                  | Connectors that fetch data from the chain.                                                  |
| [Intent](docs/intent.md)                          | Intent to change anything on an organization or its apps.                                   |
| [Organization](docs/organization.md)              | Aragon organization.                                                                        |
| [Permission](docs/permission.md)                  | Permission represents the relation between an app role and an entity.                       |
| [Repo](docs/repo.md)                              | App repository.                                                                             |
| [Role](docs/role.md)                              | Single role, which can get assigned to create a permission.                                 |
| [TransactionPath](docs/transaction-path.md)       | Single transaction path.                                                                    |
| [TransactionRequest](docs/transaction-request.md) | Object describing a transaction that can get signed by a library like ethers.js or Web3.js. |

## Principles

These are some principles that we can use to make decisions. They are only indicative and shouldn’t be seen as a strict set of rules.

- **Data structures**: the data structures we expose are more important than the rest, even the API.
- **Programmatic API**: after the data structures, the way users interact with the library takes priority over the rest.
- **Approachable**: most common tasks can be accomplished with a minimum amount of code and knowledge by our users.
- **Consistent**: we should reuse names and patterns whenever possible. When it makes sense, we should align with the other Aragon pieces.
- **Flexible**: the library should be flexible enough to cover multiple cases when it makes sense. For example, a parameter expecting an `App` object could also accept the app address.
- **Familiar**: interacting with the library should have a certain sense of familiarity. For example, by providing a React version of the library because of the React popularity.
- **Simple**: a simple solution is generally preferred over a complex one that might provide more complete features or a better future-proofing.
- **Fast**: common scenarios should be as fast as possible, even at the cost of impacting less common scenarios.
- **Lightweight**: the bundle size should be as small as possible.
- **Low reliance on external libraries**: external libraries should only be used when they provide a clear benefit over the costs they add in terms of size, maintainance, complexity, performances, etc.
- **Extensible**: we should aim for a good level of extensibility if it doesn’t conflict with the other principles. For example, custom connectors can be injected but we also embed the most common ones.
