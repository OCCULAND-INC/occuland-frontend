import styled from '@emotion/styled';
import { Web3Provider } from '@ethersproject/providers';
import { useWeb3React } from '@web3-react/core';
import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import ClipLoader from 'react-spinners/ClipLoader';

import Backdrop from '~/components/global/Backdrop/Backdrop';
import Button from '~/components/global/Button/Button';
import Select, { SelectOption } from '~/components/global/Select/Select';
import { addAssetToWaitCheker } from '~/state/polling/actions';
import { store } from '~/state/store';
import { openOption } from '~/state/utils/actions';

import Land from '../../../../contracts/Land.json';
import Occuland from '../../../../contracts/Occuland.json';
import BridgeAsset from '../BridgeAsset/BridgeAsset';

const ERROR_INDICATOR = styled.div`
  position: absolute;
  bottom: 10px;
  right: 10px;
  width: 250px;
  height: 50px;
  border-radius: 10px;
  box-shadow: 1px 2px 4px 1px grey;
  background-color: #f4a8be;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 10px;
  &:hover {
    cursor: pointer;
  }
  span {
    text-align: center;
    font-weight: bold;
    color: black;
    padding: 0px 10px;
    width: 100%;
  }
  button {
    border-left: solid 1px black;
    font-weight: 900;
    font-size: 20px;
    width: 50px;
  }
`;

enum LOADING_STATE {
  ERROR = 'ERROR',
  INIT = 'INIT',
  NTWRK_CHANGE = 'NTWRK_CHANGE',
  OFF = 'OFF',
  TXN_WAIT = 'TXN_WAIT',
}

const getAllAssetsFromOwner = async (
  wallet_address: string,
  contract_address: string,
  chain: string,
  setLoading: (e: LOADING_STATE) => void,
  setAssets: (e: Array<SelectOption>) => void,
) => {
  fetch(
    `https://deep-index.moralis.io/api/v2/${wallet_address}/nft/${contract_address}?chain=${chain}&format=decimal`,
    {
      method: 'GET',
      headers: {
        accept: 'application/json',
        'X-API-Key':
          'Bi0Jg7ErflhatonyuScinKbmkK7Vc7ZnaJKpHBlwbDyIuWHHcbp4VbPimhQBHC9w',
      },
    },
  )
    .then(async (response) => {
      const res = await response.json();
      const x: Array<SelectOption> = await res.result.map(
        (item: { token_id: string }) => ({
          text: item.token_id,
          value: item.token_id,
        }),
      );
      setAssets(x);
      setLoading(LOADING_STATE.OFF);
    })
    .catch((err) => {
      console.error(err);
    });
};

const mockOptions: Array<SelectOption> = [
  {
    value: '0x3',
    text: 'Ethereum',
  },
  {
    value: '0xa869',
    text: 'Avalanche',
  },
];
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const chainIds: any = {
  '0x3': 3,
  '0xa869': 43113,
};

function TokenBridge() {
  const context = useWeb3React<Web3Provider>();
  const [loading, setLoading] = useState<LOADING_STATE>(LOADING_STATE.INIT);
  const [assets, setAssets] = useState<Array<SelectOption>>([]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [contract, setContract] = useState<any>();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [abi, setAbi] = useState<any>(Land);
  const [contractAddress, setContractAddress] = useState<string>(
    '0x527d522aCe5AdFE80Dd4819186d5577a06f8Aa8a',
  );
  const [selectedNetwork, setSelectedNetwork] = useState<string>('0x3');
  const [selectedAsset, setSelectedAsset] = useState<SelectOption>();
  const [networkNeedsChange, setNetworkNeedsChange] = useState<boolean>();
  const [LOADING_MESSAGE, SET_LOADING_MESSAGE] = useState<string>('');

  useEffect(() => {
    if (contractAddress) {
      getAllAssetsFromOwner(
        context.account ? context.account : '',
        contractAddress,
        selectedNetwork,
        loadingMiddleman,
        setAssets,
      );
      connectToContract(context.library, abi, contractAddress);
    }
  }, [contractAddress, abi]);

  useEffect(() => {
    setSelectedAsset(assets[0]);
  }, [assets]);

  useEffect(() => {
    if (context.chainId?.toString() != chainIds[selectedNetwork]) {
      setNetworkNeedsChange(true);
    } else {
      setNetworkNeedsChange(false);
    }
  }, [selectedNetwork, context.chainId]);

  const loadingMiddleman = async (state: LOADING_STATE) => {
    if (state == LOADING_STATE.OFF) {
      setTimeout(() => setLoading(state), 1000);
    } else {
      setLoading(state);
    }
  };

  const connectToContract = async (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    val: any,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    abi: any,
    contractAddress: string,
  ) => {
    if (val.provider) {
      const pr = new ethers.providers.Web3Provider(val.provider);
      const signer = pr.getSigner();
      setContract(new ethers.Contract(contractAddress, abi.abi, signer));
    }
  };

  const handleSelectNetwork = (option: SelectOption) => {
    setLoading(LOADING_STATE.NTWRK_CHANGE);
    switch (option.text) {
      case 'Ethereum':
        setContractAddress('0x527d522aCe5AdFE80Dd4819186d5577a06f8Aa8a');
        setAbi(Land);
        break;
      case 'Avalanche':
        setContractAddress('0xC2Add3317E84E7F9EaA89f376b5e92585D6539fB');
        setAbi(Occuland);
        break;
      default:
    }
    setSelectedNetwork(option.value);
  };

  const handleSelectAssetId = (option: SelectOption) => {
    setSelectedAsset(option);
  };

  const handleClickBridge = async () => {
    if (context.chainId?.toString() != selectedNetwork) {
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
      const txn = await contract.transferFrom(
        context.account,
        '0xb92bC1F5456e1E7B2971450D36FD2eBE73eeF70B',
        parseInt(selectedAsset?.value || '0'),
        { value: 0 },
      );
      const txnReceipt = await txn.wait();
      if (txnReceipt) {
        // eslint-disable-next-line no-console
        //console.log(txnReceipt.transactionHash);
        checkBridgeAssetStatus(
          context.account?.toString() || '',
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
      const txn = await contract.bridgeBack(
        parseInt(selectedAsset?.value || '0'),
        { value: 0 },
      );
      const txnReceipt = await txn.wait();
      if (txnReceipt) {
        checkBridgeAssetStatus(
          context.account?.toString() || '',
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
          options={mockOptions}
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
      {loading == LOADING_STATE.ERROR && (
        <ERROR_INDICATOR onClick={() => setLoading(LOADING_STATE.OFF)}>
          <span>Loading Error</span>
          <button>X</button>
        </ERROR_INDICATOR>
      )}
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
