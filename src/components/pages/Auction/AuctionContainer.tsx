import styled from '@emotion/styled';
import { Web3Provider } from '@ethersproject/providers';
import { useWeb3React } from '@web3-react/core';
import { AuctionHouse, Zora } from '@zoralabs/zdk';
import { ethers, Wallet } from 'ethers';
import { useEffect, useState } from 'react';

import { Platforms } from '~/assets/platforms/Plaforms';
import approveAbi from '~/contracts/Approve.json';

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

const PROFILE_HEADER = styled.div`
  background-color: transparent;
  padding: 20px;
  .header-content {
    width: calc(100% - 60px);
    left: 20px;
    z-index: 1;
    margin-right: 130px;
    position: absolute;
    border-bottom: solid 2px #ccc;
    box-sizing: border-box;
    background-color: #efefef;
    border-radius: 10px;
    box-shadow: 0px 0px 5px 1px #ccc;
    ul {
      display: flex;
      flex-direction: row;
      padding-top: 0px;

      li {
        :first-child {
          border-left: none;
          border-bottom-left-radius: 10px;
        }
        :last-child {
          border-right: none;
        }
      }
    }
  }
`;

interface PROFILE_TAB_PROPS {
  indicator: number;
}
const PROFILE_TAB = styled.li<PROFILE_TAB_PROPS>`
  border: solid 0.5px #ccc;
  border-top: none;
  border-bottom: solid 2px transparent;
  :hover {
    cursor: pointer;
    border-bottom: solid 2px purple;
    label {
      cursor: pointer;
      color: purple;
    }
    span {
      background-color: purple;
      color: white;
    }
  }
  height: 50px;
  width: 150px;
  display: flex;
  justify-content: center;
  align-items: center;

  label {
    font-weight: 600;
  }
  span {
    margin-left: 5px;
    background-color: #ccc;
    height: 20px;
    width: 30px;
    border-radius: 40%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 10px;
    font-weight: 700;
    opacity: ${(PROFILE_TAB_PROPS: { indicator: number }) =>
      PROFILE_TAB_PROPS.indicator > 0 ? '1' : '0'};
  }
`;

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
  const [auctionHouse, setAuctionHouse] = useState<any>(undefined);
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
      const _auctionHouse = new AuctionHouse(signer, 4);
      const _zora = new Zora(signer, 4);
      setAuctionHouse(_auctionHouse);
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

  const approveTxn = async (contractAddress: string, tokenId: string) => {
    const contract = new ethers.Contract(
      contractAddress,
      approveAbi.abi,
      signer,
    );
    console.log(contract);
    return contract.approve(auctionHouse.auctionHouse.address, tokenId);
  };

  const auctionIt = async (contractAddress: string, tokenId: string) => {
    console.log(auctionHouse);
    console.log(zora);
    //console.log(tokenId);
    const approvalTx = await approveTxn(contractAddress, tokenId);

    await approvalTx.wait();

    const createAuctionTx = await auctionHouse.createAuction(
      tokenId,
      '0',
      '0',
      '0x4e9becbfe8170e94b06db6041a1937eee28534e7',
      '1',
      '0x0000000000000000000000000000000000000000',
      contractAddress,
    );

    const receipt = await createAuctionTx.wait();
    console.log(receipt);
    const auction =
      await auctionHouse.auctionHouse.fetchAuctionFromTransactionReceipt(
        receipt,
      );
    console.log(auction);
  };

  if (zora == undefined) {
    return <div>loading . . . </div>;
  }

  return (
    <div
      style={{
        height: '100vh',
        position: 'relative',
        boxSizing: 'border-box',
      }}
    >
      <PROFILE_HEADER>
        <div className="header-content">
          <ul>
            <PROFILE_TAB indicator={0}>
              <label>Assets</label>
              <span>0</span>
            </PROFILE_TAB>
            <PROFILE_TAB indicator={1}>
              <label>Auction</label>
              <span>5</span>
            </PROFILE_TAB>
            <PROFILE_TAB indicator={4}>
              <label>Bidding</label>
              <span>199</span>
            </PROFILE_TAB>
            <PROFILE_TAB indicator={0}>
              <label>Renting</label>
              <span>1</span>
            </PROFILE_TAB>
          </ul>
        </div>
      </PROFILE_HEADER>
      {context.account ? (
        <div
          style={{
            padding: '0px 15px',
            paddingTop: '35px',
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
              <MoralisNFTCard
                key={index}
                item={item}
                onClick={(e: string, f: string) => auctionIt(e, f)}
              ></MoralisNFTCard>
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

function MoralisNFTCard(props: {
  item: MoralisNFT;
  onClick: (e: string, f: string) => void;
}) {
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
        <button
          onClick={() =>
            props.onClick(props.item.token_address, props.item.token_id)
          }
        >
          Sell at Auction
        </button>
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
