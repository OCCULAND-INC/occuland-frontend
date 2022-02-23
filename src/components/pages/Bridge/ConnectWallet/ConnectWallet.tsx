import { Web3Provider } from '@ethersproject/providers';
import { useWeb3React } from '@web3-react/core';
import Image from 'next/image';
import { useEffect } from 'react';

import Button from '~/components/global/Button/Button';
import { useWeb3ManagerContext } from '~/contexts/Web3Manager.context';
import {
  ConnectorNames,
  CONNECTORS_WITH_INFO,
  ConnectorType,
} from '~/lib/utils/connectors';
import { setError } from '~/state/error/actions';
import { store } from '~/state/store';

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

  useEffect(() => {
    store.dispatch(setError(context.error?.toString() || ''));
  }, [context.error]);

  const handleConnect =
    (currentConnector: ConnectorType, name: ConnectorNames) => async () => {
      try {
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: '0x4' }],
        });
        setActivatingConnector(currentConnector);
        activate(CONNECTORS_WITH_INFO[name].connector);
        // eslint-disable-next-line no-empty
      } catch (e) {}
    };

  return (
    <div className="container mx-auto h-full flex flex-col justify-center items-center relative">
      {Object.keys(CONNECTORS_WITH_INFO).map((name) => {
        const {
          connector: currentConnector,
          svg,
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          name: connectorName,
        } = CONNECTORS_WITH_INFO[name as ConnectorNames];
        //const activating = currentConnector === activatingConnector;
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
            <span className="mx-5">
              {context.account ? (
                <Address address={context.account?.toString() || ''} />
              ) : (
                'Metamask'
              )}
            </span>
            {connected && !disabled && (
              <span role="img" aria-label="check">
                ✅
              </span>
            )}
          </Button>
        );
      })}
      {/*error && <Alert type={AlertType.ERROR} text={error.message} />*/}
    </div>
  );
}

export default ConnectWallet;

function Address(props: { address: string }) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {/*<Identicon value={props.address} size={32} />*/}
      <label>
        {' '}
        {props.address.substring(0, 3) +
          '...' +
          props.address.substring(39, 42)}
      </label>
    </div>
  );
}
