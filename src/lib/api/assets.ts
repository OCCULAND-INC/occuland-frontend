import { fetchWithErrorHandling } from '../fetch';

interface AssetsResponse {
  result: Array<{ token_id: string }>;
}

export const getAllAssetsFromOwner = async (
  ownerAddress: string,
  contract_address: string,
  chainName: string,
) => {
  return await fetchWithErrorHandling<AssetsResponse>({
    endpoint: `${ownerAddress}/nft/${contract_address}`,
    headers: {
      accept: 'application/json',
      'X-API-Key': process.env.MORALIS_API ?? '',
    },
    method: 'get',
    params: {
      ownerAddress,
      contract_address,
    },
    query: {
      chain: chainName,
      format: 'decimal',
    },
    urlBase: process.env.MORALIS_BASE_URL ?? '',
  });
};
