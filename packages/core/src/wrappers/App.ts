import Repo from "./Repo"
import Base from "./Base"
import { ConnectorInterface } from "../ConnectorTypes"

// TODO: Implement all these from API spec.
// [x] address 	String 	The address of the app proxy contract (never changes).
// [x] appId 	String 	The appName but encoded.
// [-] (need registry name prop) appName 	String 	The app ENS identifier. E.g. "token-manager.aragonpm.eth"
// [-] (ipfs) author 	String 	App author, from the repository. E.g. "Aragon Association".
// [ ] chainId 	String 	Chain ID for this app.
// [ ] codeAddress 	String 	The address of the app contract (changes with every major version).
// [ ] contentUri 	String 	The location of the app content. Empty for special apps like the kernel. E.g. "ipfs:QmdLEDDfi…"
// [ ] contractPath 	String 	Path of the contract. E.g. "contracts/TokenManager.sol"
// [ ] description 	String 	App description, from the repository. E.g. "Manage an organization’s token supply and distribution.".
// [ ] htmlPath 	String 	The path of the app HTML page. Stays empty if the app doesn’t have a frontend. E.g. /index.html
// [ ] htmlUrl 	String 	The HTTP URL of the app HTML page. Uses the IPFS HTTP provider. E.g. http://gateway.ipfs.io/ipfs/QmdLEDDfi…/index.html
// [ ] contentUrl 	String 	The HTTP URL of the app content. Uses the IPFS HTTP provider. E.g. http://gateway.ipfs.io/ipfs/QmdLEDDfi…/
// [ ] icons 	{ src: String, sizes: String }[] 	Array of icons for the app (follows the web app manifest icons format).
// [x] name 	String 	Name of the app, from the repository. E.g. "Tokens".
// [x] registryAddress 	String 	Address of the aragonPM registry for this app.
// [-] (need name prop) registry 	String 	Name of the aragonPM registry for this app. E.g. "aragonpm.eth"
// [ ] sourceUrl 	String 	URL of the app source code.
// [x] version 	String 	The current version of the app.
// [x] kernelAddress 	String 	The address of the kernel.
// [x] isForwarder 	Boolean 	Whether the app can act as a forwarder.
// [ ] tags 	String[] 	Tags associated with the app.

export interface AppData {
  name?: string
  address: string
  appId: string
  version: string
  registryAddress: string
  kernelAddress: string
  isForwarder: boolean
}

export default class App extends Base implements AppData {
  readonly name?: string
  readonly address!: string
  readonly appId!: string
  readonly version!: string
  readonly registryAddress!: string
  readonly kernelAddress!: string
  readonly isForwarder!: boolean

  constructor(data: AppData, connector: ConnectorInterface) {
    super(connector)

    Object.assign(this, data)
  }

  async repo(): Promise<Repo> {
    return this._connector.repoForApp!(this.address)
  }
}
