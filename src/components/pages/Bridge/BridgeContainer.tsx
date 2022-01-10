import { Web3Provider } from '@ethersproject/providers';
import { useWeb3React } from '@web3-react/core';

import ConnectWallet from './ConnectWallet/ConnectWallet';
import TokenBridge from './TokenBridge/TokenBridge';

function BridgeContainer() {
  const context = useWeb3React<Web3Provider>();
  const { connector } = context;

  if (connector) {
    return <TokenBridge />;
  }

  return <ConnectWallet />;
}

export default BridgeContainer;
