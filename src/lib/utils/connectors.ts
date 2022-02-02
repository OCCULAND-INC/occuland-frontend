import { UnsupportedChainIdError } from '@web3-react/core';
import { UserRejectedRequestError as UserRejectedRequestErrorFrame } from '@web3-react/frame-connector';
import {
  InjectedConnector,
  NoEthereumProviderError,
  UserRejectedRequestError as UserRejectedRequestErrorInjected,
} from '@web3-react/injected-connector';
import { NetworkConnector } from '@web3-react/network-connector';
import { UserRejectedRequestError as UserRejectedRequestErrorWalletConnect } from '@web3-react/walletconnect-connector';

import MetamaskIcon from '~/assets/wallets/metamask.svg';

const RPC_URLS: { [chainId: number]: string } = {
  1: process.env.RPC_URL_1 as string,
  3: process.env.RPC_URL_1 as string,
  4: process.env.RPC_URL_4 as string,
};

export const injected = new InjectedConnector({
  supportedChainIds: [3, 43113],
});

export const network = new NetworkConnector({
  urls: { 1: RPC_URLS[1], 3: RPC_URLS[3], 4: RPC_URLS[4] },
  defaultChainId: 3, // for testing purpose
});

export function getErrorMessage(error: Error) {
  if (error instanceof NoEthereumProviderError) {
    return 'No Ethereum browser extension detected, install MetaMask on desktop or visit from a dApp browser on mobile.';
  } else if (error instanceof UnsupportedChainIdError) {
    return "You're connected to an unsupported network.";
  } else if (
    error instanceof UserRejectedRequestErrorInjected ||
    error instanceof UserRejectedRequestErrorWalletConnect ||
    error instanceof UserRejectedRequestErrorFrame
  ) {
    return 'Please authorize this website to access your Ethereum account.';
  } else {
    console.error(error);
    return 'An unknown error occurred. Check the console for more details.';
  }
}

export enum ConnectorNames {
  Injected = 'Injected',
}

export type ConnectorType = InjectedConnector | NetworkConnector;

interface ConnectorWithInfo {
  connector: ConnectorType;
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  svg: any;
}

export const CONNECTORS_WITH_INFO: {
  [connectorName in ConnectorNames]: ConnectorWithInfo;
} = {
  [ConnectorNames.Injected]: {
    name: 'Metamask',
    connector: injected,
    svg: MetamaskIcon,
  },
};
