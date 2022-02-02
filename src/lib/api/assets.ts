import { fetchWithErrorHandling } from '../fetch';

interface AssetsResponse {
  result: Array<{ token_id: string }>;
}

export const getAllAssetsFromOwner = async (
  wallet_address: string,
  contract_address: string,
  chainName: string,
) => {
  return await fetchWithErrorHandling<AssetsResponse>({
    endpoint: `${wallet_address}/nft/${contract_address}`,
    headers: {
      accept: 'application/json',
      'X-API-Key':
        'Bi0Jg7ErflhatonyuScinKbmkK7Vc7ZnaJKpHBlwbDyIuWHHcbp4VbPimhQBHC9w',
    },
    method: 'get',
    params: {
      wallet_address,
      contract_address,
    },
    query: {
      chain: chainName,
      format: 'decimal',
    },
    urlBase: 'https://deep-index.moralis.io/api/v2/',
  });
};
