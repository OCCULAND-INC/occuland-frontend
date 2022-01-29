export function addAssetToWaitCheker(address: string, assetId: string) {
  return {
    type: 'WAIT_ON_DATA',
    data: { address, assetId },
  };
}
