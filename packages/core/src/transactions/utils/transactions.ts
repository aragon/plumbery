import ethers from 'ethers'

import TransactionRequest from '../TransactionRequest'
import App from '../../wrappers/App'
import { Abi, FunctionFragment } from '../../types'

const DEFAULT_GAS_FUZZ_FACTOR = 1.5
const PREVIOUS_BLOCK_GAS_LIMIT_FACTOR = 0.95

const erc20ABI = [
  'function balanceOf(address _who) public view returns (uint256)',
  'function allowance(address _owner, address _spender) public view returns (uint256)',
  'function approve(address _spender, uint256 _value) public returns (bool)',
]

const forwarderAbi = [
  'function forward(bytes evmCallScript) public',
  'function canForward(address sender, bytes evmCallScript) public view returns (bool)',
  'function isForwarder() external pure returns (bool)',
]

const forwarderFeeAbi = [
  'function forwardFee() external view returns (address, uint256)',
]

// Is the given method a full signature, e.g. 'foo(arg1,arg2,...)'
export const isFullMethodSignature = (methodSignature: string): boolean => {
  return (
    Boolean(methodSignature) &&
    methodSignature.includes('(') &&
    methodSignature.includes(')')
  )
}

export interface directTransaction extends TransactionRequest {
  token?: {
    address: string
    value: string
    spender: string
  }
  pretransaction?: {
    from: string
    to: string
    data: string
  }
}

export async function applyPretransaction(
  directTransaction: directTransaction
) {
  // Token allowance pretransaction
  if (directTransaction.token) {
    const {
      from,
      to,
      token: { address: tokenAddress, value: tokenValue, spender },
    } = directTransaction

    // Approve the transaction destination unless an spender is passed to approve a different contract
    const approveSpender = spender || to

    // TODO: handle provider network: using chainId from Transaction Request?
    const provider = ethers.getDefaultProvider()

    const tokenContract = new ethers.Contract(tokenAddress, erc20ABI, provider)
    const balance = await tokenContract.balanceOf(from)

    const tokenValueBN = ethers.utils.bigNumberify(tokenValue)

    if (ethers.utils.bigNumberify(balance).lt(tokenValueBN)) {
      throw new Error(
        `Balance too low. ${from} balance of ${tokenAddress} token is ${balance} (attempting to send ${tokenValue})`
      )
    }

    const allowance = await tokenContract.allowance(from, approveSpender)
    const allowanceBN = ethers.utils.bigNumberify(allowance)

    // If allowance is already greater than or equal to amount, there is no need to do an approve transaction
    if (allowanceBN.lt(tokenValueBN)) {
      if (allowanceBN.gt(ethers.constants.Zero)) {
        // TODO: Actually handle existing approvals (some tokens fail when the current allowance is not 0)
        console.warn(
          `${from} already approved ${approveSpender}. In some tokens, approval will fail unless the allowance is reset to 0 before re-approving again.`
        )
      }

      const tokenApproveTransaction = {
        // TODO: should we include transaction options?
        from,
        to: tokenAddress,
        // TODO: verify how to encode the function call
        data: ethers.utils.RLP.encode(
          await tokenContract.approve(approveSpender, tokenValue)
        ),
      }

      directTransaction.pretransaction = tokenApproveTransaction
      delete directTransaction.token
    }
  }

  return directTransaction
}

export async function applyForwardingFeePretransaction(
  forwardingTransaction,
  web3
) {
  const { to: forwarder, from } = forwardingTransaction

  // TODO: handle provider network
  const provider = ethers.getDefaultProvider()

  // Check if a token approval pretransaction is needed due to the forwarder requiring a fee
  const forwarderFee = new ethers.Contract(forwarder, forwarderFeeAbi, provider)

  const feeDetails = { amount: ethers.constants.Zero }
  try {
    // Passing the EOA as `msg.sender` to the forwardFee call is useful for use cases where the fee differs relative to the account
    const feeResult = await forwarderFee.forwardFee({ from }) // forwardFee() returns (address, uint256)
    feeDetails.tokenAddress = feeResult[0]
    feeDetails.amount = ethers.utils.bigNumberify(feeResult[1])
  } catch (err) {
    // Not all forwarders implement the `forwardFee()` interface
  }

  if (feeDetails.tokenAddress && feeDetails.amount.gt(ethers.constants.Zero)) {
    // Needs a token approval pretransaction
    forwardingTransaction.token = {
      address: feeDetails.tokenAddress,
      spender: forwarder, // since it's a forwarding transaction, always show the real spender
      value: feeDetails.amount.toString(),
    }
  }

  return applyPretransaction(forwardingTransaction)
}

export async function createDirectTransaction(
  sender: string,
  destination: string,
  abi: Abi,
  methodJsonDescription: FunctionFragment,
  params: any[]
) {
  let transactionOptions = {}

  // If an extra parameter has been provided, it is the transaction options if it is an object
  if (
    methodJsonDescription.inputs.length + 1 === params.length &&
    typeof params[params.length - 1] === 'object'
  ) {
    const options = params.pop()
    transactionOptions = { ...transactionOptions, ...options }
  }

  const interface = new ethers.utils.Interface(abi)

  // TODO: Create a TransactionRequest instance
  // The direct transaction we eventually want to perform
  const directTransaction = {
    ...transactionOptions, // Options are overwriten by the values below
    from: sender,
    to: destination,
    data: interface.functions[methodJsonDescription.name].encode(params),
  }

  // Add any pretransactions specified
  return applyPretransaction(directTransaction)
}

export async function createDirectTransactionForApp(
  sender: string,
  app: App,
  methodSignature: string,
  params: any[]
) {
  if (!app) {
    throw new Error(`Could not create transaction due to missing app artifact`)
  }

  const destination = app.address

  if (!app.abi) {
    throw new Error(`No ABI specified in artifact for ${destination}`)
  }

  const methodJsonDescription = app.abi.find((method) => {
    // If the full signature isn't given, just find the first overload declared
    if (!isFullMethodSignature(methodSignature)) {
      return method.name === methodSignature
    }

    // Fallback functions don't have inputs in the ABI
    const currentParameterTypes = Array.isArray(method.inputs)
      ? method.inputs.map(({ type }) => type)
      : []
    const currentMethodSignature = `${method.name}(${currentParameterTypes.join(
      ','
    )})`
    return currentMethodSignature === methodSignature
  })

  if (!methodJsonDescription) {
    throw new Error(`${methodSignature} not found on ABI for ${destination}`)
  }

  return createDirectTransaction(
    sender,
    destination,
    app.abi,
    methodJsonDescription as FunctionFragment,
    params
  )
}

export function createForwarderTransactionBuilder(sender, directTransaction) {
  // TODO: handle provider network
  const provider = ethers.getDefaultProvider()

  // Check if a token approval pretransaction is needed due to the forwarder requiring a fee
  const forwarder = new ethers.Contract(forwarder, forwarderFeeAbi, provider)

  return (forwarderAddress, script) => ({
    ...directTransaction, // Options are overwriten by the values below
    from: sender,
    to: forwarderAddress,
    // TODO: verify how to encode the function call
    data: ethers.utils.RLP.encode(await forwarder.forward(script)),
  })
}

export async function getRecommendedGasLimit(
  web3,
  estimatedGasLimit,
  { gasFuzzFactor = DEFAULT_GAS_FUZZ_FACTOR } = {}
) {
  const latestBlock = await web3.eth.getBlock('latest')
  const latestBlockGasLimit = latestBlock.gasLimit

  const upperGasLimit = Math.round(
    latestBlockGasLimit * PREVIOUS_BLOCK_GAS_LIMIT_FACTOR
  )
  const bufferedGasLimit = Math.round(estimatedGasLimit * gasFuzzFactor)

  if (estimatedGasLimit > upperGasLimit) {
    // TODO: Consider whether we should throw an error rather than returning with a high gas limit
    return estimatedGasLimit
  } else if (bufferedGasLimit < upperGasLimit) {
    return bufferedGasLimit
  } else {
    return upperGasLimit
  }
}

/**
 * Encode a call script
 *
 * ```
 * CallScriptAction {
 *   to: string;
 *   data: string;
 * }
 * ```
 *
 * Example:
 *
 * input:
 * [
 *  { to: 0xaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa, data: 0x11111111 },
 *  { to: 0xbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb, data: 0x2222222222 }
 * ]
 *
 * output:
 * 0x00000001
 *   aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa0000000411111111
 *   bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb000000052222222222
 *
 *
 * @param {Array<CallScriptAction>} actions
 * @returns {string}
 */
export function encodeCallScript(actions) {
  return actions.reduce((script: string, { to, data }) => {
    const address = abi.encodeParameter('address', to)
    const dataLength = abi
      .encodeParameter('uint256', (data.length - 2) / 2)
      .toString('hex')

    return script + address.slice(26) + dataLength.slice(58) + data.slice(2)
  }, CALLSCRIPT_ID)
}

/**
 * Whether the `sender` can use the `forwarder` to invoke `script`.
 *
 * @param  {string} forwarder
 * @param  {string} sender
 * @param  {string} script
 * @return {Promise<bool>}
 */
export function canForward(forwarder, sender, script) {
  // TODO: handle provider network
  const provider = ethers.getDefaultProvider()

  // Check if a token approval pretransaction is needed due to the forwarder requiring a fee
  const forwarder = new ethers.Contract(forwarder, forwarderFeeAbi, provider)

  return forwarder.canForward(sender, script).catch(() => false)
}
