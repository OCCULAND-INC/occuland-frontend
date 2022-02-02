import { SelectOption } from '~/components/global/Select/Select';

export enum LOADING_STATE {
  ERROR = 'ERROR',
  INIT = 'INIT',
  NTWRK_CHANGE = 'NTWRK_CHANGE',
  OFF = 'OFF',
  TXN_WAIT = 'TXN_WAIT',
}

export enum SUPPORTED_CHAINS {
  AVL = 'Avalanche',
  ETHEREUM = 'Ethereumn',
}

export const fromOptions: Array<SelectOption> = [
  {
    value: '0x3',
    text: SUPPORTED_CHAINS.ETHEREUM,
  },
  {
    value: '0xa869',
    text: SUPPORTED_CHAINS.AVL,
  },
];
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const chainIds: any = {
  '0x3': 3,
  '0xa869': 43113,
};

export const CONTRACT_ADDRESSES: { [key in SUPPORTED_CHAINS]: string } = {
  [SUPPORTED_CHAINS.AVL]: '0xC2Add3317E84E7F9EaA89f376b5e92585D6539fB',
  [SUPPORTED_CHAINS.ETHEREUM]: '0x527d522aCe5AdFE80Dd4819186d5577a06f8Aa8a',
};

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
