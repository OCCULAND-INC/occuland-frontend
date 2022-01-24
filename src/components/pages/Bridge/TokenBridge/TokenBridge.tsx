import Button from '~/components/global/Button/Button';
import Select, { SelectOption } from '~/components/global/Select/Select';
import { useState, useEffect } from 'react';
import { Web3Provider } from '@ethersproject/providers';
import { useWeb3React } from '@web3-react/core';
import { Contract } from "@ethersproject/contracts";
import { ethers, providers } from "ethers";
import Land from '../../../../contracts/Land.json';
import Occuland from '../../../../contracts/Occuland.json';
import { text } from 'node:stream/consumers';
import ClipLoader from "react-spinners/ClipLoader";
import styled from '@emotion/styled';



const LOADING_SCREEN = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgb(1,1,1, 0.8);
  display: flex;
  justify-content: center;
  z-index: 1;
`
const ERROR_INDICATOR = styled.div`
  position: absolute;
  bottom: 10px;
  right: 10px;
  width: 250px;
  height: 50px;
  border-radius: 10px;
  box-shadow: 1px 2px 4px 1px grey;
  background-color: #F4A8BE;
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
`

enum LOADING_STATE {
  INIT = "INIT",
  NTWRK_CHANGE = "NTWRK_CHANGE",
  TXN_WAIT = "TXN_WAIT",
  ERROR = "ERROR",
  OFF = "OFF"
}

const getAllAssetsFromOwner = async (
    wallet_address:string, 
    contract_address:string, 
    chain:string, 
    setLoading:Function,
    setAssets:Function,
  ) => {
    console.log(wallet_address)
  fetch(`https://deep-index.moralis.io/api/v2/${wallet_address}/nft/${contract_address}?chain=${chain}&format=decimal`, {
    "method": "GET",
    "headers": {
      "accept": "application/json",
      "X-API-Key": "Bi0Jg7ErflhatonyuScinKbmkK7Vc7ZnaJKpHBlwbDyIuWHHcbp4VbPimhQBHC9w"
    }
  })
  .then(async response => {
    let res = await response.json();
    let x:any = await res.result.map((item:any) => ({text: item.token_id, value: item.token_id}));
    setAssets(x);
    setLoading(LOADING_STATE.OFF);
  })
  .catch(err => {
    console.error(err);
  });
}

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

const mockAssets: Array<SelectOption> = [
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
];

function TokenBridge() {
  const context = useWeb3React<Web3Provider>();
  let [loading, setLoading] = useState<LOADING_STATE>(LOADING_STATE.INIT);
  let [assets, setAssets] = useState<Array<SelectOption>>([]);
  let [contract, setContract] = useState<any>();
  let [abi, setAbi] = useState<any>(Land);
  let [contractAddress, setContractAddress] = useState<string>("0x527d522aCe5AdFE80Dd4819186d5577a06f8Aa8a");
  let [selectedNetwork, setSelectedNetwork] = useState<string>('0x3');
  let [selectedAsset, setSelectedAsset] = useState<SelectOption>();


  useEffect(() => {
    connectToContract(context.library, abi, contractAddress);
  },[]);

  useEffect(()=>{
    if(contractAddress){
      getAllAssetsFromOwner(context.account ? context.account : '', contractAddress, selectedNetwork, loadingMiddleman, setAssets);
    }
  }, [contractAddress]);

  useEffect(() => {
    setSelectedAsset(assets[0]);
  }, [assets])

  const loadingMiddleman = async (state:LOADING_STATE) => {
    if(state == LOADING_STATE.OFF){
      setTimeout(()=> setLoading(state), 1000);
    } else {
      setLoading(state);
    }
  }

  const connectToContract = async (val:any, abi:any, contractAddress:string) => {
    if(val.provider){
      let pr = new ethers.providers.Web3Provider(val.provider);
      let signer = pr.getSigner();
      setContract(new ethers.Contract(contractAddress, abi.abi, signer));
    }
  }

  const handleSelectNetwork = (option: SelectOption) => {
    console.info('selected option', option);
    setLoading(LOADING_STATE.NTWRK_CHANGE);
    switch(option.text){
      case 'Ethereum': 
          setContractAddress('0x527d522aCe5AdFE80Dd4819186d5577a06f8Aa8a');
          setAbi(Land);
          break;
      case 'Avalanche': 
          setContractAddress('0x8c92859593f3aaad5c5f078a50dca5b38cfa9528');
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
    //@ts-ignore
    if(context.chainId != selectedNetwork){
      //@ts-ignore
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: selectedNetwork }],
      });
      connectToContract(context.library, abi, contractAddress);
    } else {
      connectToContract(context.library, abi, contractAddress);
    }

    //@ts-ignore
    if(context.chainId == '0xa869') {
      bridgeAssetToAvax();
    } else {
      bridgeAssetToEth();
    }
  };

  const bridgeAssetToAvax = async () => {
    setLoading(LOADING_STATE.TXN_WAIT);
    try{
      let txn = await contract.transferFrom(
        context.account, 
        '0xb92bC1F5456e1E7B2971450D36FD2eBE73eeF70B', 
        //@ts-ignore
        parseInt(selectedAsset.value), {value: 0}
      );
      let txnReceipt = await txn.wait();
      if(txnReceipt){
        setLoading(LOADING_STATE.OFF);
      }
    } catch(e) {
      setLoading(LOADING_STATE.ERROR);
      console.log(e);
    }
  }

  const bridgeAssetToEth = async () => {
    setLoading(LOADING_STATE.TXN_WAIT);
    try{
      let txn = await contract.bridgeBack(
        //@ts-ignore
        parseInt(selectedAsset.value), {value: 0}
      );
      let txnReceipt = await txn.wait();
      if(txnReceipt){
        console.log(txnReceipt);
        setLoading(LOADING_STATE.OFF);
      }
    } catch(e) {
      setLoading(LOADING_STATE.ERROR);
      console.log(e);
    }
  }
  
  if(loading == LOADING_STATE.INIT){
    return(<LOADING_SCREEN><LoadingSpinnerComponent message="Loading . . ."/></LOADING_SCREEN>);
  }

  return (
    <div className="container mx-auto h-full flex flex-col justify-center items-center" style={{position:'relative'}}>
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
        <div className="flex justify-center items-center">
          <Button 
            disabled={loading != 'OFF' ? true : false}
            onClick={handleClickBridge}
            css={{width: '250px', display: 'flex'}}
          >
            {
              selectedNetwork == '0x3' ? 
              <Network url={'https://www.pngall.com/wp-content/uploads/10/Avalanche-Crypto-Logo-PNG-Pic.png'} title='Avalanche' /> : 
              <Network url={'https://www.pngall.com/wp-content/uploads/10/Ethereum-Logo-PNG-Image-HD.png'} title='Ethereum' /> 
              
            }
          </Button>
        </div>
      </div>
      {loading == LOADING_STATE.TXN_WAIT && 
        <LOADING_SCREEN><LoadingSpinnerComponent message='Confirming Transaction . . .' /></LOADING_SCREEN>
      }
      {loading == LOADING_STATE.NTWRK_CHANGE && 
        <LOADING_SCREEN><LoadingSpinnerComponent message='Retrieving Your NFTs' /></LOADING_SCREEN>
      }
      {loading == LOADING_STATE.ERROR && 
        <ERROR_INDICATOR onClick={()=> setLoading(LOADING_STATE.OFF)}>
          <span>Loading Error</span>
          <button>X</button>
        </ERROR_INDICATOR>
      }
    </div>
  );
}

function LoadingSpinnerComponent(props: {message:string}){
  return(
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <ClipLoader color={'#C39BD3'}  size={150} />
      <span style={{
        fontWeight: 'bold',
        fontSize: '20px',
        color: '#EFEDED'
      }}>{props.message}</span>
    </div>
  )
}

function Network(props:{url:string, title:string}){
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
  `
  return(
    <COMP>
      <span>Bridge Asset to</span>
      <img src={props.url}/>
      <label>{props.title}</label>
    </COMP>
  )
}

export default TokenBridge;

