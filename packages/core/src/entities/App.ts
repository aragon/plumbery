import Repo from './Repo'
import Role from './Role'
import Entity from './Entity'
import {
  AragonArtifact,
  AragonArtifactFunction,
  Abi,
  AragonEnvironment,
  AragonManifest,
} from '../types'
import { ConnectorInterface } from '../connections/ConnectorInterface'

// TODO: Implement all properties and methods from the API spec (https://github.com/aragon/plumbery/blob/master/docs/app.md).
// [x] address 	String 	The address of the app proxy contract (never changes).
// [x] appId 	String 	The appName but encoded.
// [x] (ipfs) appName 	String 	The app ENS identifier. E.g. "token-manager.aragonpm.eth"
// [x] (ipfs) author 	String 	App author, from the repository. E.g. "Aragon Association".
// [ ] chainId 	String 	Chain ID for this app.
// [x] codeAddress 	String 	The address of the app contract (changes with every major version).
// [x] contentUri 	String 	The location of the app content. Empty for special apps like the kernel. E.g. "ipfs:QmdLEDDfi…"
// [x] (ipfs) contractPath 	String 	Path of the contract. E.g. "contracts/TokenManager.sol"
// [x] (ipfs) description 	String 	App description, from the repository. E.g. "Manage an organization’s token supply and distribution.".
// [x] (ipfs) htmlPath 	String 	The path of the app HTML page. Stays empty if the app doesn’t have a frontend. E.g. /index.html
// [ ] (ipfs) htmlUrl 	String 	The HTTP URL of the app HTML page. Uses the IPFS HTTP provider. E.g. http://gateway.ipfs.io/ipfs/QmdLEDDfi…/index.html
// [ ] (ipfs) contentUrl 	String 	The HTTP URL of the app content. Uses the IPFS HTTP provider. E.g. http://gateway.ipfs.io/ipfs/QmdLEDDfi…/
// [x] (ipfs) icons 	{ src: String, sizes: String }[] 	Array of icons for the app (follows the web app manifest icons format).
// [x] name 	String 	Name of the app, from the repository. E.g. "Tokens".
// [x] registryAddress 	String 	Address of the aragonPM registry for this app.
// [ ] registry 	String 	Name of the aragonPM registry for this app. E.g. "aragonpm.eth"
// [x] (ipfs) sourceUrl 	String 	URL of the app source code.
// [x] version 	String 	The current version of the app.
// [x] kernelAddress 	String 	The address of the kernel.
// [x] isForwarder 	Boolean 	Whether the app can act as a forwarder.
// [ ] tags 	String[] 	Tags associated with the app.
// [x] App#repo()
// [x] App#roles()
// [ ] App#abi()
// [ ] App#intents()
// [ ] App#deprecatedIntents()

export interface AppData {
  address: string
  appId: string
  artifact?: string | null
  codeAddress: string
  contentUri?: string
  isForwarder?: boolean | null
  isUpgradeable?: boolean | null
  kernelAddress: string
  manifest?: string | null
  name?: string
  registryAddress: string
  repoAddress?: string
  version?: string
}

export default class App extends Entity implements AppData {
  readonly abi?: Abi
  readonly address!: string
  readonly appId!: string
  readonly appName?: string
  readonly author?: string
  readonly chainId?: AragonEnvironment
  readonly codeAddress!: string
  readonly contentUri?: string
  readonly contentUrl?: string
  readonly contractPath?: string
  readonly description?: string
  readonly functions?: AragonArtifactFunction[]
  readonly htmlPath?: string
  readonly htmlUrl?: string
  readonly icons?: { src: string; sizes: string }[]
  readonly isForwarder?: boolean | null
  readonly isUpgradeable?: boolean | null
  readonly kernelAddress!: string
  readonly name?: string
  readonly registryAddress!: string
  readonly registry?: string
  readonly repoAddress?: string
  readonly sourceUrl?: string
  readonly tags?: string[]
  readonly version?: string

  constructor(data: AppData, connector: ConnectorInterface) {
    super(connector)
    Object.assign(this, data)

    // TODO: If no metadata, fallback to resolve ourselves with ipfs

    if (data.artifact) {
      const artifact: AragonArtifact = JSON.parse(data.artifact)

      this.appName = artifact.appName
      this.contractPath = artifact.path
      this.functions = artifact.functions
      this.abi = artifact.abi
    }

    if (data.manifest) {
      const manifest: AragonManifest = JSON.parse(data.manifest)

      this.author = manifest.author
      this.description = manifest.description
      this.htmlPath = manifest.start_url
      this.icons = manifest.icons
      this.sourceUrl = manifest.source_url
    }
  }

  async repo(): Promise<Repo> {
    return this._connector.repoForApp!(this.address)
  }

  async roles(): Promise<Role[]> {
    return this._connector.rolesByAddress!(this.address)
  }

  // async abi(): Promise<Abi> {
  //   return
  // }

  // async intents(): Promise<Abi> {
  //   return
  // }
}
