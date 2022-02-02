import { ContractInterface } from '@ethersproject/contracts';
import { Web3Provider } from '@ethersproject/providers';
import { useWeb3React } from '@web3-react/core';
import { useEffect, useState } from 'react';
import ClipLoader from 'react-spinners/ClipLoader';

import Backdrop from '~/components/global/Backdrop/Backdrop';
import Button from '~/components/global/Button/Button';
import Select, { SelectOption } from '~/components/global/Select/Select';
import { useContract } from '~/hooks/contracts';
import { getAllAssetsFromOwner } from '~/lib/api/assets';
import { addAssetToWaitCheker } from '~/state/polling/actions';
import { store } from '~/state/store';
import { openOption } from '~/state/utils/actions';

import BridgeAsset from '../BridgeAsset/BridgeAsset';
import {
  ABIS,
  CHAIN_IDS,
  CONTRACT_ADDRESSES,
  fromOptions,
  LOADING_STATE,
  SUPPORTED_CHAINS,
  WALLET_ADDRESS,
} from './TokenBridge.utils';

function TokenBridge() {
  const { account, chainId } = useWeb3React<Web3Provider>();
  const [loading, setLoading] = useState<LOADING_STATE>(LOADING_STATE.INIT);
  const [assets, setAssets] = useState<Array<SelectOption>>([]);
  const [abi, setAbi] = useState<ContractInterface>(
    ABIS[SUPPORTED_CHAINS.ETHEREUM],
  );
  const [contractAddress, setContractAddress] = useState<string>(
    CONTRACT_ADDRESSES[SUPPORTED_CHAINS.ETHEREUM],
  );

  const [selectedNetwork, setSelectedNetwork] = useState(
    SUPPORTED_CHAINS.ETHEREUM,
  );

  const [selectedAsset, setSelectedAsset] = useState<SelectOption>();
  const [networkNeedsChange, setNetworkNeedsChange] = useState<boolean>();

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
    if (chainId !== CHAIN_IDS[selectedNetwork]) {
      setNetworkNeedsChange(true);
    } else {
      setNetworkNeedsChange(false);
    }
  }, [selectedNetwork, chainId]);

  const handleSelectNetwork = (option: SelectOption) => {
    setContractAddress(CONTRACT_ADDRESSES[option.value as SUPPORTED_CHAINS]);
    setAbi(ABIS[option.value as SUPPORTED_CHAINS]);
    setSelectedNetwork(option.value as SUPPORTED_CHAINS);
  };

  const handleSelectAssetId = (option: SelectOption) => {
    setSelectedAsset(option);
  };

  const handleClickBridge = async () => {
    if (chainId !== CHAIN_IDS[selectedNetwork]) {
      // SET_LOADING_MESSAGE('Changing networks . . . ');
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: selectedNetwork }],
      });
    }
    brigeTo();
  };

  const brigeTo = () => {
    // SET_LOADING_MESSAGE('Confirming Transaction . . . ');
    if (selectedNetwork === SUPPORTED_CHAINS.ETHEREUM) {
      bridgeAssetToAvax();
    } else {
      bridgeAssetToEth();
    }
  };

  const bridgeAssetToAvax = async () => {
    setLoading(LOADING_STATE.TXN_WAIT);
    try {
      const tx = await contract?.transferFrom(
        account,
        WALLET_ADDRESS,
        parseInt(selectedAsset?.value || '0'),
        { value: 0 },
      );
      const txReceipt = await tx.wait();

      if (txReceipt) {
        checkBridgeAssetStatus(
          account?.toString() || '',
          WALLET_ADDRESS,
          selectedAsset?.value || '0',
          'out',
          txReceipt.transactionHash,
        );
        store.dispatch(openOption());
      }
    } catch (e) {
      console.error(e);
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
            {selectedNetwork == SUPPORTED_CHAINS.ETHEREUM ? (
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

      {loading == LOADING_STATE.TXN_WAIT && <Backdrop>Loading</Backdrop>}
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
