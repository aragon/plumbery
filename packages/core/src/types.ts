import { ethers } from 'ethers'

export type ParamType = {
  name?: string
  type: string
  indexed?: boolean
  components?: Array<any>
}

export type EventFragment = {
  type: string
  name: string
  anonymous: boolean
  inputs: Array<ParamType>
}

export type FunctionFragment = {
  type: string
  name: string
  constant: boolean
  inputs: Array<ParamType>
  outputs: Array<ParamType>
  payable: boolean
  stateMutability: string
  gas?: ethers.utils.BigNumber
}

export type Abi = (EventFragment | FunctionFragment)[]

export interface AragonArtifactFunction {
  roles: string[]
  sig: string
  /**
   * This field might not be able if the contract does not use
   * conventional solidity syntax and Aragon naming standards
   * null if there in no notice
   */
  notice: string | null
  /**
   * The function's ABI element is included for convenience of the client
   * null if ABI is not found for this signature
   */
  abi: FunctionFragment | null
}
