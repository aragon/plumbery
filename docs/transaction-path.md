# TransactionPath

Represents a single transaction path.

## Methods

### TransactionPath#last()

Get the last forwarder of a transaction path.

| Name    | Type     | Description                               |
| ------- | -------- | ----------------------------------------- |
| returns | `String` | The address acting as the last forwarder. |

### TransactionPath#first()

Get the first forwarder of a transaction path.

| Name    | Type     | Description                                |
| ------- | -------- | ------------------------------------------ |
| returns | `String` | The address acting as the first forwarder. |

### TransactionPath#get()

Get the full path.

| Name    | Type            | Description                                    |
| ------- | --------------- | ---------------------------------------------- |
| returns | `Array<String>` | Array of addresses representing the full path. |

### TransactionPath#sign()

Request the signer to create the transaction for the transaction path.

| Name    | Type | Description          |
| ------- | ---- | -------------------- |
| returns | TBD  | Transaction handler. |
