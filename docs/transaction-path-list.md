# TransactionPathList

Represents a set of transaction paths.

## Methods

### TransactionPathList#all()

Get all the transaction paths.

| Name    | Type                | Description                         |
| ------- | ------------------- | ----------------------------------- |
| returns | `TransactionPath[]` | Array of all the transaction paths. |

### TransactionPath#shortest()

Get the shortest transaction path only.

| Name    | Type              | Description                    |
| ------- | ----------------- | ------------------------------ |
| returns | `TransactionPath` | The shortest transaction path. |

### TransactionPath#sign()

Request the signer to create the transaction for the shortest transaction path. This is the equivalent of doing `TransactionPathList#shortest().sign()`.

| Name    | Type | Description          |
| ------- | ---- | -------------------- |
| returns | TBD  | Transaction handler. |
