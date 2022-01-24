import Button from '~/components/global/Button/Button';
import Select, { SelectOption } from '~/components/global/Select/Select';
import { useState, useEffect } from 'react';
import { Web3Provider } from '@ethersproject/providers';
import { useWeb3React } from '@web3-react/core';
import { Contract } from "@ethersproject/contracts";
import { ethers, providers } from "ethers";
import Land from '../../../../contracts/Land.json';
import Occuland from '../../../../contracts/Occuland.json';
import { Web3ManagerContextProvider } from '~/contexts/Web3Manager.context';
import { text } from 'node:stream/consumers';


const getAllAssetsFromOwner = async (
    wallet_address:string, 
    contract_address:string, 
    chain:string, 
    setLoading:Function,
    setAssets:Function,
  ) => {
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
    setLoading(false);
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
  const { connector, activate, error } = context;
  let [loading, setLoading] = useState<boolean>(true);
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
      getAllAssetsFromOwner(context.account ? context.account : '', contractAddress, selectedNetwork, setLoading, setAssets);
    }
  }, [contractAddress]);

  useEffect(() => {
    setSelectedAsset(assets[0]);
  }, [assets])

  async function connectToContract(val:any, abi:any, contractAddress:string){
    if(val.provider){
      let pr = new ethers.providers.Web3Provider(val.provider);
      let signer = pr.getSigner();
      setContract(new ethers.Contract(contractAddress, abi.abi, signer));
    }
  }

  const handleSelectNetwork = (option: SelectOption) => {
    console.info('selected option', option);
    setLoading(true);
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
    bridgeAssetToAvax();
  };

  const bridgeAssetToAvax = async () => {
    setLoading(true);
    try{
      let txn = await contract.transferFrom(
        context.account, 
        '0xb92bC1F5456e1E7B2971450D36FD2eBE73eeF70B', 
        //@ts-ignore
        parseInt(selectedAsset.value), {value: 0}
      );
      let txnReceipt = await txn.wait();
      if(txnReceipt){
        setLoading(false);
      }
    } catch(e) {
      setLoading(true);
      console.log(e);
    }
  }
  
  if(loading){
    return(<div>loading . . .</div>);
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
        <div className="flex justify-center items-center">
          <label
            id="button-label"
            className="block text-sm font-medium text-gray-700 mr-5 mb-2"
          >
            To: {selectedNetwork == '0x3' ? 'Avalanche' : 'Ethereum'}
          </label>
          <Button onClick={handleClickBridge}>Bridge Asset</Button>
        </div>
      </div>
    </div>
  );
}

export default TokenBridge;
