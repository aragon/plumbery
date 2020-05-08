# TransactionRequest

An object describing a transaction that can get signed by a library like ethers.js or Web3.js.

## Properties

| Name       | Type     | Description                                  |
| ---------- | -------- | -------------------------------------------- |
| `chainId`  | `Number` | Chain ID of the network.                     |
| `data`     | `String` | Transaction data.                            |
| `gasLimit` | `Number` | Maximum gas this transaction may spend.      |
| `gasPrice` | `String` | Price (in wei) per unit of gas.              |
| `to`       | `String` | Target address or ENS name.                  |
| `value`    | `String` | Amount (in wei) this transaction is sending. |

## Methods

### TransactionRequest#toWeb3()

For Web3.js users, return a variant of the object that can get passed to `web3.eth.sendTransaction()`.

### TransactionRequest#toEthers()

For ethers.js users, return a variant of the object that can get passed to `wallet.sendTransaction()`.
