import styled from '@emotion/styled';
import { Web3Provider } from '@ethersproject/providers';
import { useWeb3React } from '@web3-react/core';
import { AuctionHouse } from '@zoralabs/zdk';
import { ethers, Wallet } from 'ethers';
import { solidityKeccak256 } from 'ethers/lib/utils';
import { relative } from 'path/posix';
import { useEffect, useState } from 'react';

import { Platforms } from '~/assets/platforms/Plaforms';

import ConnectWallet from '../Bridge/ConnectWallet/ConnectWallet';

//import { LOADING_STATE } from '../loading.types';

/*const data = [
  {
    amount: 'string1',
    block_number: 'string2',
    block_number_minted: 'string3',
    contract_type: 'string4',
    frozen: 1,
    is_valid: 1,
    metadata: 'string5',
    name: 'string6',
    owner_of: 'string7',
    symbol: 'string8',
    synced_at: 'string9',
    syncing: 1,
    token_address: '5string',
    token_id: '4string',
    token_uri: '3string',
  },
  {
    amount: '2string',
    block_number: '1string',
    block_number_minted: '3string',
    contract_type: '4string',
    frozen: 1,
    is_valid: 1,
    metadata: '5string',
    name: '6string',
    owner_of: '7string',
    symbol: '8string',
    synced_at: '9string',
    syncing: 1,
    token_address: '7string',
    token_id: '6string',
    token_uri: '0string',
  },
];*/

interface MoralisNFT {
  amount: string;
  block_number: string;
  block_number_minted: string;
  contract_type: string;
  frozen: number;
  is_valid: number;
  metadata: string;
  name: string;
  owner_of: string;
  symbol: string;
  synced_at: string;
  syncing: number;
  token_address: string;
  token_id: string;
  token_uri: string;
}

const getAllAssetsFromOwner = async (
  wallet_address: string,
  contract_address: string,
  chain: string,
  //setLoading?: (e: LOADING_STATE) => void,
  setAssets: (e: MoralisNFT[]) => void,
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
      const out: MoralisNFT[] = await res.result;
      if (res.result.length > 0) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        setAssets((prev: MoralisNFT[]) => [...prev, ...out]);
      }
    })
    .catch((err) => {
      console.error(err);
    });
};

export default function AuctionContainer() {
  //const { connector } = useWeb3React<Web3Provider>();
  const context = useWeb3React<Web3Provider>();
  const [signer, setSigner] = useState<any>();
  const [signerAddress, setSignerAddress] = useState('');
  const [zora, setZora] = useState<any>(undefined);
  const [assets, setAssets] = useState<MoralisNFT[]>([]);

  useEffect(() => {
    if (context.library && context.account) {
      const pr = new ethers.providers.Web3Provider(context.library.provider);
      const _signer = pr.getSigner();
      setSigner(_signer);
      setSignerAddress(context.account);
    } else {
      const url =
        'https://mainnet.infura.io/v3/f9b2cc26f7f7441f9b542c104d032ae3';
      const pr = new ethers.providers.JsonRpcProvider(url);
      let wallet = Wallet.createRandom();
      wallet = wallet.connect(pr);
      setSigner(wallet);
      setSignerAddress(wallet.address);
    }
  }, [context.account]);

  useEffect(() => {
    if (signer) {
      const _zora = new AuctionHouse(signer, 4);
      setZora(_zora);
    }
  }, [signer]);

  useEffect(() => {
    if (zora != undefined) {
      getAllAssetsFromOwner(
        signerAddress,
        '0x05EE40Ee0A0579EaF609cA456a76e32567E263B8',
        '0x4',
        setAssets,
      );
      //setAssets((prev) => [...prev, ...data]);
    }
  }, [zora]);

  if (zora == undefined) {
    return <div>loading . . . </div>;
  }

  return (
    <div
      style={{
        height: '100vh',
      }}
    >
      <div
        style={{
          width: '100%',
          position: 'relative',
          height: '100px',
        }}
      >
        <div
          className="header-content"
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            padding: '0px 15px',
            justifyContent: 'space-between',
          }}
        >
          <div>you have 200 NFTs</div>
          <button
            style={{
              backgroundColor: 'purple',
              width: '100px',
              padding: '10px',
              color: 'white',
              borderRadius: '5px',
            }}
          >
            Sync NFTs
          </button>
        </div>
        <div
          style={{
            width: '100%',
            position: 'absolute',
            bottom: '0',
            left: '0',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              borderBottom: 'solid 1px #cccc',
              width: '80%',
            }}
          ></div>
        </div>
      </div>
      {context.account ? (
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            height: '100%',
            justifyContent: 'center',
            overflow: 'scroll',
            paddingBottom: '100px',
          }}
        >
          {assets.length > 0 ? (
            assets.map((item: MoralisNFT, index: number) => (
              <MoralisNFTCard key={index} item={item}></MoralisNFTCard>
            ))
          ) : (
            <div>Where your NFTs go?</div>
          )}
        </div>
      ) : (
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <ConnectWallet onClick={() => {}} />
        </div>
      )}
    </div>
  );
}

const MORALIS_CARD = styled.div`
  position: relative;
  padding: '10px';
  margin: 10px;
  border: solid;
  width: 200px;
  height: 350px;
  border-radius: 5px;
  border: solid 1.5px #ccc;
  display: flex;
  flex-direction: column;
  :hover {
    box-shadow: 0px 0px 15px 1px rgb(1, 1, 1, 0.3);
  }
  img {
    height: 150px;
  }
  .content {
    height: auto;
  }
  .button-container {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    button {
      border-radius: 5px;
      padding: 10px;
      background-color: #212121;
      box-shadow: 0px 0px 3px 1px #ccc;
      color: white;
      :hover {
        background-color: purple;
        box-shadow: 0px 0px 0px 0px #ccc;
      }
    }
  }
  .footer-image {
    position: absolute;
    bottom: 5px;
    right: 5px;
    height: 30px;
    width: 30px;
    * {
      height: 100%;
    }
  }
`;

function MoralisNFTCard(props: { item: MoralisNFT }) {
  const platformurl = Platforms[0]['img'];
  return (
    <MORALIS_CARD>
      <img
        src={
          'https://lh3.googleusercontent.com/0fT6zkFrOec4HjEw1G3kw64OQr3n3-JCOnpTzdcbAbKwExAH64Dp9LkbqSpY6uNLRU5Em9RmWRY_riKyO9G35RimPJppMqWSbW51OQ=w600'
        }
      />
      <div className="content">
        <LabelRow label="Platform" title={props.item.name} />
        <LabelRow label="TokenId" title={props.item.token_id} />
        <LabelRow label="Type" title={props.item.contract_type} />
      </div>
      <div className="button-container">
        <button>Sell at Auction</button>
      </div>
      <div className="footer-image">
        <img src={platformurl} />
      </div>
    </MORALIS_CARD>
  );
}

const CARD_INFO_ROW = styled.div`
  padding-top: 2px;
  display: flex;
  flex-direction: row;
  *:first-child {
    font-weight: 600;
    padding-left: 5px;
  }
  *:last-child {
    padding-left: 5px;
  }
`;

function LabelRow(props: { label: string; title: string }) {
  return (
    <CARD_INFO_ROW>
      <label>{props.label}:</label>
      <span>
        {props.title.length > 10
          ? props.title.substring(0, 10) + '...'
          : props.title}
      </span>
    </CARD_INFO_ROW>
  );
}
