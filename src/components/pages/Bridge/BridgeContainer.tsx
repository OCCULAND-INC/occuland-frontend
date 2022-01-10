import { Web3Provider } from '@ethersproject/providers';
import { AbstractConnector } from '@web3-react/abstract-connector';
import { useWeb3React } from '@web3-react/core';
import Image from 'next/image';
import { useEffect, useState } from 'react';

import Button from '~/components/global/Button/Button';
import { useEagerConnect, useInactiveListener } from '~/hooks/connects';
import {
  ConnectorNames,
  CONNECTORS_WITH_INFO,
  ConnectorType,
} from '~/lib/utils/connectors';

function BridgeContainer() {
  const context = useWeb3React<Web3Provider>();
  const {
    connector,
    // library,
    chainId,
    // account,
    activate,
    // deactivate,
    // active,
    error,
  } = context;
  console.info('chainId======>', chainId);
  const [activatingConnector, setActivatingConnector] =
    useState<AbstractConnector>();
  useEffect(() => {
    if (activatingConnector && activatingConnector === connector) {
      setActivatingConnector(undefined);
    }
  }, [activatingConnector, connector]);

  // handle logic to eagerly connect to the injected ethereum provider, if it exists and has granted access already
  const triedEager = useEagerConnect();

  // handle logic to connect in reaction to certain events on the injected ethereum provider, if it exists
  useInactiveListener(!triedEager || !!activatingConnector);

  const handleConnect =
    (currentConnector: ConnectorType, name: ConnectorNames) => () => {
      setActivatingConnector(currentConnector);
      activate(CONNECTORS_WITH_INFO[name]);
    };

  return (
    <div className="container mx-auto h-full flex flex-col justify-center items-center">
      {Object.keys(CONNECTORS_WITH_INFO).map((name) => {
        const {
          connector: currentConnector,
          svg,
          name: connectorName,
        } = CONNECTORS_WITH_INFO[name as ConnectorNames];
        const activating = currentConnector === activatingConnector;
        const connected = currentConnector === connector;
        const disabled =
          !triedEager || !!activatingConnector || connected || !!error;

        return (
          <Button
            key={name}
            onClick={handleConnect(currentConnector, name as ConnectorNames)}
            disabled={disabled}
            className="flex justify-center items-center"
          >
            {svg && <Image src={svg} />}
            <span className="mx-5">{connectorName}</span>
            {activating && 'Connecting...'}
            {connected && (
              <span role="img" aria-label="check">
                ✅
              </span>
            )}
          </Button>
        );
      })}
    </div>
  );
}

export default BridgeContainer;
