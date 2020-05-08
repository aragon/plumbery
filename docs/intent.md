# Intent

Intent to change anything on an organization and its apps, through an Ethereum transaction. Allows to get transaction paths from it.

## Methods

### Intent#paths(account, options)

Get all the possible transaction paths for a given address. This can be useful to let users pick the one they want. Otherwise, `Intent#transactions()` can get called directly.

| Name         | Type                | Description                                                                                      |
| ------------ | ------------------- | ------------------------------------------------------------------------------------------------ |
| `address`    | `String`            | The account that will sign the transaction.                                                      |
| `options`    | `Object`            | Options object.                                                                                  |
| `options.as` | `String`            | Address of an Aragon organization, or its agent app, through which the paths should get created. |
| returns      | `TransactionPath[]` | Array of all the possible transaction paths.                                                     |

### Intent#transactions(account, options)

Get the transactions to execute for the shortest transaction path.

This is an easier way to do `intent.paths(account, options)[0].transactions`

| Name         | Type                   | Description                                                                                      |
| ------------ | ---------------------- | ------------------------------------------------------------------------------------------------ |
| `address`    | `String`               | The account that will sign the transaction.                                                      |
| `options`    | `Object`               | Options object.                                                                                  |
| `options.as` | `String`               | Address of an Aragon organization, or its agent app, through which the paths should get created. |
| returns      | `TransactionRequest[]` | The transactions corresponding to the shortest transaction path.                                 |
