import { fetchWithErrorHandling } from '../fetch';

export const getAllAssetsFromOwner = async (
  wallet_address: string,
  contract_address: string,
  chain: string,
) => {
  return await fetchWithErrorHandling({
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
      chain,
      format: 'decimal',
    },
    urlBase: 'https://deep-index.moralis.io/api/v2/',
  });
};
