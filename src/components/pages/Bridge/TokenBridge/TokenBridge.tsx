import styled from '@emotion/styled';
import { Web3Provider } from '@ethersproject/providers';
import { useWeb3React } from '@web3-react/core';
import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import ClipLoader from 'react-spinners/ClipLoader';

import Button from '~/components/global/Button/Button';
import Select, { SelectOption } from '~/components/global/Select/Select';

import Land from '../../../../contracts/Land.json';
import Occuland from '../../../../contracts/Occuland.json';

const LOADING_SCREEN = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgb(1, 1, 1, 0.8);
  display: flex;
  justify-content: center;
  z-index: 1;
`;
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

/*const mockAssets: Array<SelectOption> = [
  {
    value: '0xasd234sdf234234sdf',
    text: '0xasd234sdf234234sdf',
  },
  {
    value: '0xaaa234sdf234234sdf',
    text: '0xaaa234sdf234234sdf',
  },
  {
    value: '0xbbb234sdf234234sdf',
    text: '0xbbb234sdf234234sdf',
  },
];*/

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
    if (context.chainId?.toString() != selectedNetwork) {
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
    console.info('selected option', option);
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
        setLoading(LOADING_STATE.OFF);
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
        setLoading(LOADING_STATE.OFF);
      }
    } catch (e) {
      setLoading(LOADING_STATE.ERROR);
    }
  };

  const testMintLand = async () => {
    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: '0x3' }],
    });
    setTimeout(async () => {
      const res = await contract.mintLand();
      await res.wait();
    }, 3000);
  };

  if (loading == LOADING_STATE.INIT) {
    return (
      <LOADING_SCREEN>
        <LoadingSpinnerComponent message="Loading . . ." />
      </LOADING_SCREEN>
    );
  }

  return (
    <div
      className="container mx-auto h-full flex flex-col justify-center items-center"
      style={{ position: 'relative' }}
    >
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
              <Network
                url={
                  'https://www.pngall.com/wp-content/uploads/10/Avalanche-Crypto-Logo-PNG-Pic.png'
                }
                title="Avalanche"
              />
            ) : (
              <Network
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
      <div
        style={{
          backgroundColor: 'red',
          color: 'white',
          position: 'absolute',
          right: '10px',
          top: '10px',
        }}
      >
        <button onClick={testMintLand}>GET TESTNET LAND</button>
      </div>
      {loading == LOADING_STATE.TXN_WAIT && (
        <LOADING_SCREEN>
          <LoadingSpinnerComponent message={LOADING_MESSAGE} />
        </LOADING_SCREEN>
      )}
      {loading == LOADING_STATE.NTWRK_CHANGE && (
        <LOADING_SCREEN>
          <LoadingSpinnerComponent message="Retrieving Your NFTs" />
        </LOADING_SCREEN>
      )}
      {loading == LOADING_STATE.ERROR && (
        <ERROR_INDICATOR onClick={() => setLoading(LOADING_STATE.OFF)}>
          <span>Loading Error</span>
          <button>X</button>
        </ERROR_INDICATOR>
      )}
      <div style={{ position: 'absolute', top: '2px', left: '1px' }}>
        <Address address={ethers.utils.getAddress(context?.account || '')} />
      </div>
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

function Network(props: { title: string; url: string }) {
  const COMP = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
    label {
      padding-left: 5px;
      color: white;
    }
    img {
      padding-left: 5px;
      height: 100%;
    }
  `;
  return (
    <COMP>
      <span>Bridge Asset to</span>
      <img src={props.url} />
      <label>{props.title}</label>
    </COMP>
  );
}

function Address(props: { address: string }) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
      }}
    >
      {/*<Identicon value={props.address} size={32} />*/}
      <label>
        {' '}
        Connected:{' '}
        {props.address.substring(0, 6) +
          '...' +
          props.address.substring(36, 42)}
      </label>
    </div>
  );
}

export default TokenBridge;
