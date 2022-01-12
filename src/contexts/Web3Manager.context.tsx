import { AbstractConnector } from '@web3-react/abstract-connector';
import { Dispatch, ReactNode, SetStateAction, useState } from 'react';

import { useEagerConnect, useInactiveListener } from '~/hooks/connects';
import { createContext } from '~/lib/utils/context';

export interface Web3ManagerContextProps {
  activatingConnector: AbstractConnector | undefined;
  setActivatingConnector: Dispatch<
    SetStateAction<AbstractConnector | undefined>
  >;
  triedEager: boolean;
}

const Web3ManagerContext = createContext<Web3ManagerContextProps>();

export function useWeb3ManagerContextSetup(): Web3ManagerContextProps {
  const [activatingConnector, setActivatingConnector] =
    useState<AbstractConnector>();

  // handle logic to eagerly connect to the injected ethereum provider, if it exists and has granted access already
  const triedEager = useEagerConnect();
  // handle logic to connect in reaction to certain events on the injected ethereum provider, if it exists
  useInactiveListener(!triedEager || !!activatingConnector);

  return {
    activatingConnector,
    setActivatingConnector,
    triedEager,
  };
}

export function Web3ManagerContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const value = useWeb3ManagerContextSetup();
  return (
    <Web3ManagerContext.Provider value={value}>
      {children}
    </Web3ManagerContext.Provider>
  );
}

export const useWeb3ManagerContext = Web3ManagerContext.useContext;
