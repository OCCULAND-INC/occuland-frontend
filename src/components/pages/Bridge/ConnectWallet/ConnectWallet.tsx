import { Web3Provider } from '@ethersproject/providers';
import { useWeb3React } from '@web3-react/core';
import Image from 'next/image';
import { useEffect } from 'react';

import Alert from '~/components/global/Alert/Alert';
import { AlertType } from '~/components/global/Alert/Alert.types';
import Button from '~/components/global/Button/Button';
import { useWeb3ManagerContext } from '~/contexts/Web3Manager.context';
import {
  ConnectorNames,
  CONNECTORS_WITH_INFO,
  ConnectorType,
} from '~/lib/utils/connectors';

interface Props {
  onClick: () => void;
}

function ConnectWallet({ onClick }: Props) {
  const context = useWeb3React<Web3Provider>();
  const { connector, activate, error } = context;

  const { activatingConnector, setActivatingConnector, triedEager } =
    useWeb3ManagerContext();

  useEffect(() => {
    if (context.account) {
      onClick();
    }
  }, [context.account]);

  const handleConnect =
    (currentConnector: ConnectorType, name: ConnectorNames) => async () => {
      try {
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: '0x3' }],
        });
        setActivatingConnector(currentConnector);
        activate(CONNECTORS_WITH_INFO[name].connector);
      } catch (e) {
        console.error(e);
      }
    };

  return (
    <div className="container mx-auto h-full flex flex-col justify-center items-center relative">
      {Object.keys(CONNECTORS_WITH_INFO).map((name) => {
        const {
          connector: currentConnector,
          svg,
          name: connectorName,
        } = CONNECTORS_WITH_INFO[name as ConnectorNames];
        const activating = currentConnector === activatingConnector;
        const connected = currentConnector === connector;
        const disabled = !triedEager || !!activatingConnector || !!error;

        return (
          <Button
            key={name}
            onClick={
              connected && !disabled
                ? onClick
                : handleConnect(currentConnector, name as ConnectorNames)
            }
            className="flex justify-center items-center mb-5"
          >
            {svg && <Image src={svg} width={25} height={25} />}
            <span className="mx-5">{connectorName}</span>
            {activating && 'Connecting...'}
            {connected && !disabled && (
              <span role="img" aria-label="check">
                ✅
              </span>
            )}
          </Button>
        );
      })}
      {error && <Alert type={AlertType.ERROR} text={error.message} />}
    </div>
  );
}

export default ConnectWallet;
