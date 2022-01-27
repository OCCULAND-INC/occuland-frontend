import { Web3Provider } from '@ethersproject/providers';
import { useWeb3React } from '@web3-react/core';
import { useState } from 'react';

import ConnectWallet from './ConnectWallet/ConnectWallet';
import TokenBridge from './TokenBridge/TokenBridge';

function BridgeContainer() {
  const { connector } = useWeb3React<Web3Provider>();
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const handleClick = () => {
    setIsClicked(true);
  };

  if (connector && isClicked) {
    return <TokenBridge />;
  }

  return <ConnectWallet onClick={handleClick} />;
}

export default BridgeContainer;
