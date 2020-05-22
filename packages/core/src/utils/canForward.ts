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
