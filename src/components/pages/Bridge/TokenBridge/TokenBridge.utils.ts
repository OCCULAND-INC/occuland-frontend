import { ContractInterface } from '@ethersproject/contracts';

import { SelectOption } from '~/components/global/Select/Select';
import { abi as LandAbi } from '~/contracts/Land.json';
import { abi as OcculandAbi } from '~/contracts/Occuland.json';

export enum LOADING_STATE {
  ERROR = 'ERROR',
  INIT = 'INIT',
  NTWRK_CHANGE = 'NTWRK_CHANGE',
  OFF = 'OFF',
  TXN_WAIT = 'TXN_WAIT',
}

export enum SUPPORTED_CHAINS {
  AVL = 'avalanche',
  ETHEREUM = 'ropsten',
}

export const fromOptions: Array<SelectOption> = [
  {
    value: SUPPORTED_CHAINS.ETHEREUM,
    text: SUPPORTED_CHAINS.ETHEREUM,
  },
  {
    value: SUPPORTED_CHAINS.AVL,
    text: SUPPORTED_CHAINS.AVL,
  },
];

export const CHAIN_IDS: { [key in SUPPORTED_CHAINS]: number } = {
  [SUPPORTED_CHAINS.ETHEREUM]: 3,
  [SUPPORTED_CHAINS.AVL]: 43113,
};

export const CONTRACT_ADDRESSES: { [key in SUPPORTED_CHAINS]: string } = {
  [SUPPORTED_CHAINS.AVL]: '0xC2Add3317E84E7F9EaA89f376b5e92585D6539fB',
  [SUPPORTED_CHAINS.ETHEREUM]: '0x527d522aCe5AdFE80Dd4819186d5577a06f8Aa8a',
};

export const ABIS: { [key in SUPPORTED_CHAINS]: ContractInterface } = {
  [SUPPORTED_CHAINS.ETHEREUM]: LandAbi,
  [SUPPORTED_CHAINS.AVL]: OcculandAbi,
};

export const COMPANY_WALLET_ADDRESS =
  '0xb92bC1F5456e1E7B2971450D36FD2eBE73eeF70B';

// export const testMintLand = async () => {
//   await window.ethereum.request({
//     method: 'wallet_switchEthereumChain',
//     params: [{ chainId: '0x3' }],
//   });
//   setTimeout(async () => {
//     const res = await contract.mintLand();
//     await res.wait();
//   }, 3000);
// };
