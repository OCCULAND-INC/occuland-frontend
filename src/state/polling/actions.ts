export function addAssetToWaitCheker(
  from: string,
  to: string,
  assetId: string,
  type: string,
  hash: string,
) {
  return {
    type: 'WAIT_ON_DATA',
    // eslint-disable-next-line sort-keys
    data: { from, to, assetId, type, hash },
  };
}
