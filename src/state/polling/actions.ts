export function addAssetToWaitCheker(
  from: string,
  to: string,
  assetId: string,
  type: string,
) {
  return {
    type: 'WAIT_ON_DATA',
    data: { from, to, assetId, type },
  };
}
