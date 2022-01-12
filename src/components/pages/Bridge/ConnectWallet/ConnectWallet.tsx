import { Web3Provider } from '@ethersproject/providers';
import { useWeb3React } from '@web3-react/core';
import Image from 'next/image';

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

  const handleConnect =
    (currentConnector: ConnectorType, name: ConnectorNames) => () => {
      setActivatingConnector(currentConnector);
      activate(CONNECTORS_WITH_INFO[name].connector);
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
        console.log('======>', triedEager, activatingConnector, error);
        const disabled = !triedEager || !!activatingConnector || !!error;

        return (
          <Button
            key={name}
            onClick={
              connected
                ? onClick
                : handleConnect(currentConnector, name as ConnectorNames)
            }
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

export default ConnectWallet;
