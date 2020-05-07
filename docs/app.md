# App

An app installed in an organization from a repository.

## Properties

| Name              | Type                               | Description                                                                                                              |
| ----------------- | ---------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| `address`         | `String`                           | The address of the app proxy contract (never changes).                                                                   |
| `appId`           | `String`                           | The appName but encoded.                                                                                                 |
| `appName`         | `String`                           | The app ENS identifier. E.g. `"token-manager.aragonpm.eth"`                                                              |
| `author`          | `String`                           | App author, from the repository. E.g. `"Aragon Association"`.                                                            |
| `chainId`         | `String`                           | Chain ID for this app.                                                                                                   |
| `codeAddress`     | `String`                           | The address of the app contract (changes with every major version).                                                      |
| `contentUri`      | `String`                           | The location of the app content. Empty for special apps like the kernel. E.g. `"ipfs:QmdLEDDfi…"`                        |
| `contractPath`    | `String`                           | Path of the contract. E.g. `"contracts/TokenManager.sol"`                                                                |
| `description`     | `String`                           | App description, from the repository. E.g. `"Manage an organization’s token supply and distribution."`.                  |
| `htmlPath`        | `String`                           | The path of the app HTML page. Stays empty if the app doesn’t have a frontend. E.g. `/index.html`                        |
| `htmlUrl`         | `String`                           | The HTTP URL of the app HTML page. Uses the IPFS HTTP provider. E.g. `http://gateway.ipfs.io/ipfs/QmdLEDDfi…/index.html` |
| `contentUrl`      | `String`                           | The HTTP URL of the app content. Uses the IPFS HTTP provider. E.g. `http://gateway.ipfs.io/ipfs/QmdLEDDfi…/`             |
| `icons`           | `{ src: String, sizes: String }[]` | Array of icons for the app (follows the web app manifest `icons` format).                                                |
| `name`            | `String`                           | Name of the app, from the repository. E.g. `"Tokens"`.                                                                   |
| `registryAddress` | `String`                           | Address of the aragonPM registry for this app.                                                                           |
| `registry`        | `String`                           | Name of the aragonPM registry for this app. E.g. `"aragonpm.eth"`                                                        |
| `sourceUrl`       | `String`                           | URL of the app source code.                                                                                              |
| `version`         | `String`                           | The current version of the app.                                                                                          |
| `kernelAddress`   | `String`                           | The address of the kernel.                                                                                               |
| `isForwarder`     | `Boolean`                          | Whether the app can act as a forwarder.                                                                                  |
| `tags`            | `String[]`                         | Tags associated with the app.                                                                                            |

## Methods

### App#repo()

Fetch the app repository.

| Name    | Type            | Description                                |
| ------- | --------------- | ------------------------------------------ |
| returns | `Promise<Repo>` | A promise resolving to the app repository. |

### App#abi()

Fetch the ABI of the app contract.

| Name    | Type                | Description                                      |
| ------- | ------------------- | ------------------------------------------------ |
| returns | `Promise<Object[]>` | A promise resolving to an Ethereum contract ABI. |

## App#intents()

Fetch the intents available on an app.

| Name    | Type                   | Description                                                                                                                    |
| ------- | ---------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| returns | `Promise<AppIntent[]>` | A promise resolving to an array of app intents. It contains the Ethereum ABI, roles, and radspec notice attached to an intent. |

## App#deprecatedIntents()

Fetch the deprecated intents on an app.

| Name    | Type                                  | Description                                                            |
| ------- | ------------------------------------- | ---------------------------------------------------------------------- |
| returns | `Promise<{ [version]: AppIntent[] }>` | A promise resolving to the deprecated app intents, grouped by version. |
