import { Web3Provider } from '@ethersproject/providers';
import { useWeb3React } from '@web3-react/core';
import { ReactNode, useEffect } from 'react';

import {
  useWeb3ManagerContext,
  Web3ManagerContextProvider,
} from '~/contexts/Web3Manager.context';
import { isBrowser } from '~/lib/utils/browser';

interface Props {
  children: ReactNode;
}

function Web3Manager({ children }: Props) {
  const context = useWeb3React<Web3Provider>();
  const { connector, active, error } = context;

  isBrowser() && !window.__WEB3_CONTEXT__
    ? (window.__WEB3_CONTEXT__ = context)
    : {};

  console.error('Web3 manager error:', error);
  console.info('%c Active: %s', 'background: #222; color: #bada55', active);

  const { activatingConnector, setActivatingConnector } =
    useWeb3ManagerContext();

  useEffect(() => {
    if (activatingConnector && activatingConnector === connector) {
      setActivatingConnector(undefined);
    }
  }, [activatingConnector, connector]);

  return <>{children}</>;
}

function Web3ManagerWithContext({ children }: Props) {
  return (
    <Web3ManagerContextProvider>
      <Web3Manager>{children}</Web3Manager>
    </Web3ManagerContextProvider>
  );
}
export default Web3ManagerWithContext;