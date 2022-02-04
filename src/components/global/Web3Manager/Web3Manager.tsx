import { Web3Provider } from '@ethersproject/providers';
import { useWeb3React } from '@web3-react/core';
import { ReactNode, useEffect } from 'react';

import {
  useWeb3ManagerContext,
  Web3ManagerContextProvider,
} from '~/contexts/Web3Manager.context';
import useBlockNumberUpdate from '~/hooks/block';
import { useSubscribeToTxQuery } from '~/hooks/transaction';
import { isBrowser } from '~/lib/utils/browser';

interface Props {
  children: ReactNode;
}

function Web3Manager({ children }: Props) {
  const context = useWeb3React<Web3Provider>();
  const { connector, active, error, account } = context;

  useSubscribeToTxQuery(account || '');

  isBrowser() && !window.__WEB3__CONTEXT__
    ? (window.__WEB3__CONTEXT__ = context)
    : {};

  error?.message &&
    console.info(
      '%c Web3Manager error: %s',
      'background: #555; color: #FF6f00',
      error?.message,
    );
  console.info(
    '%c Active: %s',
    'background: #222; color: #bada55',
    active,
    'connector',
    connector,
  );

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
  useBlockNumberUpdate();

  return (
    <Web3ManagerContextProvider>
      <Web3Manager>{children}</Web3Manager>
    </Web3ManagerContextProvider>
  );
}
export default Web3ManagerWithContext;
