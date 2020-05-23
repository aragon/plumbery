import { ethers } from 'ethers'

import { Abi, FunctionFragment } from '../types'
import { isFullMethodSignature } from './isFullMethodSignature'
import App from '../entities/App'
import { TransactionRequestData } from '../transactions/TransactionRequest'

const DEFAULT_GAS_FUZZ_FACTOR = 1.5
const PREVIOUS_BLOCK_GAS_LIMIT_FACTOR = 0.95

const erc20ABI = [
  'function balanceOf(address _who) public view returns (uint256)',
  'function allowance(address _owner, address _spender) public view returns (uint256)',
  'function approve(address _spender, uint256 _value) public returns (bool)',
]

const forwarderAbi = [
  'function forward(bytes evmCallScript) public',
  'function isForwarder() external pure returns (bool)',
]

const forwarderFeeAbi = [
  'function forwardFee() external view returns (address, uint256)',
]

export interface transactionWithTokeData extends TransactionRequestData {
  token: {
    address: string
    value: string
    spender: string
  }
}

export interface txWithPreTransaction extends TransactionRequestData {
  pretransaction?: TransactionRequestData
}

export function createDirectTransaction(
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

  const ethersInterface = new ethers.Interface(abi)

  // The direct transaction we eventually want to perform
  const directTransaction = {
    ...transactionOptions, // Options are overwriten by the values below
    from: sender,
    to: destination,
    data: ethersInterface.functions[methodJsonDescription.name].encode(params),
  }

  // TODO: include once we support calculate transaction path
  // // Add any pretransactions specified
  // applyPretransaction(directTransaction, provider)

  return directTransaction
}

export function createDirectTransactionForApp(
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

export function createForwarderTransactionBuilder(
  sender: string,
  directTransaction: TransactionRequestData
) {
  const forwarder = new ethers.Interface(forwarderAbi)

  return (forwarderAddress: string, script: string) => ({
    ...directTransaction, // Options are overwriten by the values below
    from: sender,
    to: forwarderAddress,
    data: forwarder.functions.forward.encode([script]),
  })
}

export async function applyPretransaction(
  transaction: transactionWithTokeData,
  chainId: number,
  givenProvider?: ethers.providers.Provider
) {
  const provider = givenProvider || new ethers.providers.InfuraProvider(chainId)

  // Token allowance pretransaction
  const {
    from,
    to,
    token: { address: tokenAddress, value: tokenValue, spender },
  } = transaction

  // Approve the transaction destination unless an spender is passed to approve a different contract
  const approveSpender = spender || to

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

    const erc20 = new ethers.Interface(erc20ABI)

    const tokenApproveTransaction = {
      // TODO: should we include transaction options?
      from,
      to: tokenAddress,
      data: erc20.functions.approve.encode([approveSpender, tokenValue]),
    }

    delete transaction.token

    return {
      ...transaction,
      pretransaction: tokenApproveTransaction,
    }
  }

  return transaction
}

export async function applyForwardingFeePretransaction(
  forwardingTransaction: TransactionRequestData,
  chainId: number,
  givenProvider?: ethers.providers.Provider
) {
  const provider = givenProvider || new ethers.providers.InfuraProvider(chainId)

  const { to: forwarderAddress, from } = forwardingTransaction

  const forwarderFee = new ethers.Contract(
    forwarderAddress,
    forwarderFeeAbi,
    provider
  )

  const feeDetails = { amount: ethers.constants.Zero, tokenAddress: '' }
  try {
    const overrides = {
      from,
    }
    // Passing the EOA as `msg.sender` to the forwardFee call is useful for use cases where the fee differs relative to the account
    const returnValues = await forwarderFee.forwardFee(overrides) // forwardFee() returns (address, uint256)
    feeDetails.tokenAddress = returnValues.tokenAddress
    feeDetails.amount = ethers.utils.bigNumberify(returnValues.amount)
  } catch (err) {
    // Not all forwarders implement the `forwardFee()` interface
  }

  if (feeDetails.tokenAddress && feeDetails.amount.gt(ethers.constants.Zero)) {
    // Needs a token approval pretransaction
    const forwardingTxWithTokenData: transactionWithTokeData = {
      ...forwardingTransaction,
      token: {
        address: feeDetails.tokenAddress,
        spender: forwarderAddress, // since it's a forwarding transaction, always show the real spender
        value: feeDetails.amount.toString(),
      },
    }
    return applyPretransaction(forwardingTxWithTokenData, chainId, provider)
  }

  return forwardingTransaction
}

export async function getRecommendedGasLimit(
  estimatedGasLimit: ethers.types.BigNumber,
  chainId: number,
  givenProvider?: ethers.providers.Provider,
  { gasFuzzFactor = DEFAULT_GAS_FUZZ_FACTOR } = {}
) {
  const provider = givenProvider || new ethers.providers.InfuraProvider(chainId)

  const latestBlockNumber = await provider.getBlockNumber()
  const latestBlock = await provider.getBlock(latestBlockNumber)
  const latestBlockGasLimit = latestBlock.gasLimit

  const upperGasLimit = latestBlockGasLimit.mul(
    ethers.utils.bigNumberify(PREVIOUS_BLOCK_GAS_LIMIT_FACTOR)
  )

  const bufferedGasLimit = estimatedGasLimit.mul(
    ethers.utils.bigNumberify(gasFuzzFactor)
  )

  if (estimatedGasLimit.gt(upperGasLimit)) {
    // TODO: Consider whether we should throw an error rather than returning with a high gas limit
    return estimatedGasLimit
  } else if (bufferedGasLimit.lt(upperGasLimit)) {
    return bufferedGasLimit
  } else {
    return upperGasLimit
  }
}

/**
 * Calculates and applies the gas limit and gas price for a transaction
 *
 * @param  {Object} transaction
 * @param  {bool} isForwarding
 * @return {Promise<Object>} The transaction with the gas limit and gas price added.
 *                           If the transaction fails from the estimateGas check, the promise will
 *                           be rejected with the error.
 */
export async function applyTransactionGas(
  transaction: txWithPreTransaction,
  isForwarding = false,
  chainId: number,
  givenProvider?: ethers.providers.Provider
) {
  const provider = givenProvider || new ethers.providers.InfuraProvider(chainId)

  // If a pretransaction is required for the main transaction to be performed,
  // performing web3.eth.estimateGas could fail until the pretransaction is mined
  // Example: erc20 approve (pretransaction) + deposit to vault (main transaction)
  if (transaction.pretransaction) {
    // Calculate gas settings for pretransaction
    transaction.pretransaction = await applyTransactionGas(
      transaction.pretransaction,
      false,
      chainId,
      provider
    )
    // Note: for transactions with pretransactions gas limit and price cannot be calculated
    return transaction
  }

  // TODO: check with ethers keep happening
  // NOTE: estimateGas mutates the argument object and transforms the address to lowercase
  // so this is a hack to make sure checksums are not destroyed
  // Also, at the same time it's a hack for checking if the call will revert,
  // since `eth_call` returns `0x` if the call fails and if the call returns nothing.
  // So yeah...

  const estimatedGasLimit = await provider.estimateGas(transaction)
  const recommendedGasLimit = await getRecommendedGasLimit(
    estimatedGasLimit,
    chainId,
    provider
  )

  // If the gas provided in the intent is lower than the estimated gas, use the estimation
  // when forwarding as it requires more gas and otherwise the transaction would go out of gas
  if (
    !transaction.gas ||
    (isForwarding && transaction.gas.lt(recommendedGasLimit))
  ) {
    transaction.gas = recommendedGasLimit
    transaction.gasLimit = recommendedGasLimit
  }

  if (!transaction.gasPrice) {
    // TODO: consider supporting an estimation function like aragon wrapper does
    transaction.gasPrice = await provider.getGasPrice()
  }

  return transaction
}
