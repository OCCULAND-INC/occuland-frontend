import { ContractInterface } from '@ethersproject/contracts';
import { Web3Provider } from '@ethersproject/providers';
import { useWeb3React } from '@web3-react/core';
import Moralis from 'moralis';
import { useEffect, useState } from 'react';

import Button from '~/components/global/Button/Button';
import Select, { SelectOption } from '~/components/global/Select/Select';
import { useContract } from '~/hooks/contracts';

import BridgeAsset from '../BridgeAsset/BridgeAsset';
import { ChainType } from './TokenBridge.types';
import {
  ABIS,
  CHAIN_IDS,
  COMPANY_WALLET_ADDRESS,
  CONTRACT_ADDRESSES,
  fromOptions,
  SUPPORTED_CHAINS,
} from './TokenBridge.utils';

function TokenBridge() {
  const { account, chainId } = useWeb3React<Web3Provider>();
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
      const apiConfig = {
        chain: selectedNetwork as ChainType,
        address: account || '',
      };

      const { result } = await Moralis.Web3API.account.getNFTs(apiConfig);

      const options: Array<SelectOption> = (result || []).map(
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
    if (selectedNetwork === SUPPORTED_CHAINS.ETHEREUM) {
      bridgeAssetToAvax();
    } else {
      bridgeAssetToEth();
    }
  };

  const bridgeAssetToAvax = async () => {
    if (!selectedAsset) {
      return;
    }

    try {
      const tx = await contract?.transferFrom(
        account,
        COMPANY_WALLET_ADDRESS,
        parseInt(selectedAsset.value),
        { value: 0 },
      );
      const txReceipt = await tx.wait();

      if (txReceipt) {
        console.info('txReceipt=======>', txReceipt);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const bridgeAssetToEth = async () => {
    try {
      const tx = await contract?.bridgeBack(
        parseInt(selectedAsset?.value || '0'),
        { value: 0 },
      );
      const txReceipt = await tx.wait();
      if (txReceipt) {
        console.info('txReceipt', txReceipt);
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="container mx-auto h-full flex flex-col justify-center items-center">
      <div className="p-6 w-96 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
        <Select
          value={selectedNetwork}
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
          value={selectedAsset?.value}
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
            disabled={!selectedAsset}
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
    </div>
  );
}

export default TokenBridge;
