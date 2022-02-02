import { ContractInterface } from '@ethersproject/contracts';
import { Web3Provider } from '@ethersproject/providers';
import { useWeb3React } from '@web3-react/core';
import { useEffect, useState } from 'react';
import ClipLoader from 'react-spinners/ClipLoader';

import Backdrop from '~/components/global/Backdrop/Backdrop';
import Button from '~/components/global/Button/Button';
import Select, { SelectOption } from '~/components/global/Select/Select';
import Land from '~/contracts/Land.json';
import Occuland from '~/contracts/Occuland.json';
import { useContract } from '~/hooks/contracts';
import { getAllAssetsFromOwner } from '~/lib/api/assets';
import { addAssetToWaitCheker } from '~/state/polling/actions';
import { store } from '~/state/store';
import { openOption } from '~/state/utils/actions';

import BridgeAsset from '../BridgeAsset/BridgeAsset';
import {
  chainIds,
  CONTRACT_ADDRESSES,
  fromOptions,
  LOADING_STATE,
  SUPPORTED_CHAINS,
} from './TokenBridge.utils';

function TokenBridge() {
  const { account, chainId } = useWeb3React<Web3Provider>();
  const [loading, setLoading] = useState<LOADING_STATE>(LOADING_STATE.INIT);
  const [assets, setAssets] = useState<Array<SelectOption>>([]);
  const [abi, setAbi] = useState<ContractInterface>(Land.abi);
  const [contractAddress, setContractAddress] = useState<string>(
    CONTRACT_ADDRESSES[SUPPORTED_CHAINS.ETHEREUM],
  );

  const [selectedNetwork, setSelectedNetwork] = useState<string>('0x3');
  const [selectedAsset, setSelectedAsset] = useState<SelectOption>();
  const [networkNeedsChange, setNetworkNeedsChange] = useState<boolean>();
  const [LOADING_MESSAGE, SET_LOADING_MESSAGE] = useState<string>('');

  const contract = useContract(contractAddress, abi);

  useEffect(() => {
    async function fetchAsset() {
      const { result } = await getAllAssetsFromOwner(
        account ? account : '',
        contractAddress,
        selectedNetwork,
      );
      const options: Array<SelectOption> = result.map(
        (item: { token_id: string }) => ({
          text: item.token_id,
          value: item.token_id,
        }),
      );
      setAssets(options);
    }

    fetchAsset();
  }, [contractAddress, abi]);

  useEffect(() => {
    if (chainId?.toString() != chainIds[selectedNetwork]) {
      setNetworkNeedsChange(true);
    } else {
      setNetworkNeedsChange(false);
    }
  }, [selectedNetwork, chainId]);

  const handleSelectNetwork = (option: SelectOption) => {
    setLoading(LOADING_STATE.NTWRK_CHANGE);
    switch (option.text) {
      case 'Ethereum':
        setContractAddress('0x527d522aCe5AdFE80Dd4819186d5577a06f8Aa8a');
        setAbi(Land.abi);
        break;
      case 'Avalanche':
        setContractAddress('0xC2Add3317E84E7F9EaA89f376b5e92585D6539fB');
        setAbi(Occuland.abi);
        break;
      default:
    }
    setSelectedNetwork(option.value);
  };

  const handleSelectAssetId = (option: SelectOption) => {
    setSelectedAsset(option);
  };

  const handleClickBridge = async () => {
    if (chainId?.toString() != selectedNetwork) {
      setLoading(LOADING_STATE.TXN_WAIT);
      SET_LOADING_MESSAGE('Changing networks . . . ');
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: selectedNetwork }],
      });
    }
    brigeTo();
  };
  const brigeTo = async () => {
    SET_LOADING_MESSAGE('Confirming Transaction . . . ');
    if (selectedNetwork == '0x3') {
      bridgeAssetToAvax();
    } else {
      bridgeAssetToEth();
    }
  };

  const bridgeAssetToAvax = async () => {
    setLoading(LOADING_STATE.TXN_WAIT);
    try {
      const txn = await contract?.transferFrom(
        account,
        '0xb92bC1F5456e1E7B2971450D36FD2eBE73eeF70B',
        parseInt(selectedAsset?.value || '0'),
        { value: 0 },
      );
      const txnReceipt = await txn.wait();
      if (txnReceipt) {
        // eslint-disable-next-line no-console
        //console.log(txnReceipt.transactionHash);
        checkBridgeAssetStatus(
          account?.toString() || '',
          '0xb92bC1F5456e1E7B2971450D36FD2eBE73eeF70B',
          selectedAsset?.value || '0',
          'out',
          txnReceipt.transactionHash,
        );
        setLoading(LOADING_STATE.OFF);
        store.dispatch(openOption());
      }
    } catch (e) {
      setLoading(LOADING_STATE.ERROR);
    }
  };

  const bridgeAssetToEth = async () => {
    setLoading(LOADING_STATE.TXN_WAIT);
    try {
      const txn = await contract?.bridgeBack(
        parseInt(selectedAsset?.value || '0'),
        { value: 0 },
      );
      const txnReceipt = await txn.wait();
      if (txnReceipt) {
        checkBridgeAssetStatus(
          account?.toString() || '',
          contractAddress,
          selectedAsset?.value || '0',
          'in',
          txnReceipt.transactionHash,
        );
        setLoading(LOADING_STATE.OFF);
        store.dispatch(openOption());
      }
    } catch (e) {
      setLoading(LOADING_STATE.ERROR);
    }
  };

  const checkBridgeAssetStatus = async (
    from: string,
    to: string,
    id: string,
    type: string,
    transaction_hash: string,
  ) => {
    store.dispatch(addAssetToWaitCheker(from, to, id, type, transaction_hash));
  };

  if (loading == LOADING_STATE.INIT) {
    return (
      <Backdrop>
        <LoadingSpinnerComponent message="Loading . . ." />
      </Backdrop>
    );
  }

  return (
    <div className="container mx-auto h-full flex flex-col justify-center items-center">
      <div className="p-6 w-96 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
        <Select
          defaultValue={selectedNetwork}
          label="From:"
          options={fromOptions}
          onChange={handleSelectNetwork}
          className="mb-5"
        />
        <Select
          label="Asset:"
          options={assets}
          onChange={handleSelectAssetId}
          className="mb-5"
        />
        <div
          style={{
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            paddingTop: '10px',
          }}
        >
          <Button
            disabled={loading != 'OFF' ? true : false}
            onClick={handleClickBridge}
            css={{ width: '250px', display: 'flex' }}
          >
            {selectedNetwork == '0x3' ? (
              <BridgeAsset
                url={
                  'https://www.pngall.com/wp-content/uploads/10/Avalanche-Crypto-Logo-PNG-Pic.png'
                }
                title="Avalanche"
              />
            ) : (
              <BridgeAsset
                url={
                  'https://www.pngall.com/wp-content/uploads/10/Ethereum-Logo-PNG-Image-HD.png'
                }
                title="Ethereum"
              />
            )}
          </Button>
          <label
            style={{
              minHeight: '30px',
              color: 'red',
            }}
          >
            {networkNeedsChange ? 'We will change networks first.' : ''}
          </label>
        </div>
      </div>

      {loading == LOADING_STATE.TXN_WAIT && (
        <Backdrop>
          <LoadingSpinnerComponent message={LOADING_MESSAGE} />
        </Backdrop>
      )}
      {loading == LOADING_STATE.NTWRK_CHANGE && (
        <Backdrop>
          <LoadingSpinnerComponent message="Retrieving Your NFTs" />
        </Backdrop>
      )}
      {loading == LOADING_STATE.ERROR && <span>Loading Error</span>}
    </div>
  );
}

function LoadingSpinnerComponent(props: { message: string }) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <ClipLoader color={'#C39BD3'} size={150} />
      <span
        style={{
          fontWeight: 'bold',
          fontSize: '20px',
          color: '#EFEDED',
        }}
      >
        {props.message}
      </span>
    </div>
  );
}

export default TokenBridge;
