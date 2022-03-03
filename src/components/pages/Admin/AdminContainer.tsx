import styled from '@emotion/styled';
import { Web3Provider } from '@ethersproject/providers';
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable sort-keys */
/* eslint-disable no-console */
import { CheckIcon, TrashIcon, XIcon } from '@heroicons/react/solid';
import { useWeb3React } from '@web3-react/core';
import { AuctionHouse, Zora } from '@zoralabs/zdk';
import { ethers } from 'ethers';
import { useEffect, useState } from 'react';

import LoadingSm from '~/components/global/Loading/LoadingSm';

import { LOADING_STATE } from '../loading.types';

interface DataAuction {
  data: Auction;
}

interface Auction {
  Auction: itemsOnAuctionV2[];
}

interface itemsOnAuctionV2 {
  approved: string;
  auctionCurrency: string;
  auctionId: string;
  auction_status: string;
  curatorFeePercentage: string;
  duration: string;
  firstBidTime: string;
  lastBidAmount: string;
  lastBidder: string;
  reservePrice: string;
  tokenContract: string;
  tokenId: string;
  tokenOwner: string;
}

const getAllAuctionsByCurator = async (
  token_curator: string,
  cb: (e: any) => void,
) => {
  fetch('https://indexer-dev-rinkeby.zora.co/v1/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: `{"query":"{\\n  Auction(\\n    where: {curator: {_ilike: \\"${token_curator}\\"}, \\nstatus: { _neq: \\"CANCELED\\"},\\n\\t\\t\\ttokenContract: {_in: [\\"0x05EE40Ee0A0579EaF609cA456a76e32567E263B8\\"]}\\n\\t}\\n\\n  ) {\\n\\t\\t\\tauctionId\\n\\t\\t\\ttokenId\\n\\t\\t\\ttokenContract\\n\\t\\t\\ttokenOwner\\n\\t\\t\\tapproved\\n\\t\\t\\tduration\\n\\t\\t\\tfirstBidTime\\n\\t\\t\\treservePrice\\n\\t\\t\\tcuratorFeePercentage\\n\\t\\t\\tauctionCurrency\\n\\t\\t\\tlastBidder\\n\\t\\t\\tlastBidAmount\\n\\t\\t\\tauction_status: status\\n  }\\n}\\n "}`,
  })
    .then(async (response) => {
      const output = await response.json();
      cb(output);
    })
    .catch((err) => {
      console.error(err);
    });
};

export default function AdminContainer() {
  const context = useWeb3React<Web3Provider>();
  const [loading, setLoading] = useState<LOADING_STATE>(LOADING_STATE.INIT);
  const [signer, setSigner] = useState<any>();
  const [auctionHouse, setAuctionHouse] = useState<any>(undefined);
  const [zora, setZora] = useState<any>(undefined);
  const [itemsOnAuction, setItemsOnAuction] = useState<itemsOnAuctionV2[]>([]);

  useEffect(() => {
    if (context.library && context.account) {
      setLoading(LOADING_STATE.INIT);
      const pr = new ethers.providers.Web3Provider(context.library.provider);
      const _signer = pr.getSigner();
      setSigner(_signer);
      getAllAuctionsByCurator(context.account, (x: DataAuction) => {
        console.log(x);
        setItemsOnAuction(x.data.Auction);
      });
    } else {
      setTimeout(() => setLoading(LOADING_STATE.OFF), 3000);
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
      setLoading(LOADING_STATE.OFF);
    }
  }, [zora]);

  useEffect(() => {
    console.log(itemsOnAuction);
  }, [itemsOnAuction]);

  const approveAuction = async (auctionId: string) => {
    const res = await auctionHouse.setAuctionApproval(auctionId, true);
    console.log(res);
  };
  return (
    <div
      style={{
        height: '100vh',
        padding: '50px',
        overflow: 'scroll',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: '100px',
      }}
    >
      table here
      {itemsOnAuction.map((el: itemsOnAuctionV2, index: number) => {
        return (
          <AuctionRow
            item={el}
            key={index}
            approveAuction={(aucId: string) => approveAuction(aucId)}
          />
        );
      })}
      {loading == LOADING_STATE.INIT ? <LoadingSm /> : null}
    </div>
  );
}

const AUCTION_ITEM_COTAINER = styled.div`
  max-width: 600px;
  width: 100%;
  height: 100px;
  background-color: #efefef;
  margin: 20px 0px;
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0px 0px 5px 3px #ccc;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  .item-info {
    width: 100%;
    ul {
      list-style: none;
      display: flex;
      flex-direction: column;
    }
  }
  .item-buttons {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .butt-container {
      margin: 10px;
      display: flex;
      flex-direction: column;
      width: 50px;
      button {
        border-radius: 10px;
        height: 50px;
        background-color: #ccc;
        display: flex;
        flex-direction: row;
        justify-content: center;
        .icon {
          height: 70%;
          color: purple;
          align-self: center;
        }
      }
      label {
        font-weight: 700;
        font-size: 10px;
        text-align: center;
      }
      :hover {
        button {
          background-color: purple;
          .icon {
            color: white;
          }
        }
      }
    }
  }
`;

function AuctionRow(props: {
  approveAuction: (e: string) => void;
  item: itemsOnAuctionV2;
}) {
  return (
    <AUCTION_ITEM_COTAINER>
      <div className="item-info">
        <ul>
          <li>Auction ID: {props.item.auctionId}</li>
          <li>Token Contract: {props.item.tokenContract.substring(0, 10)}</li>
          <li>Token ID: {props.item.tokenId}</li>
        </ul>
      </div>
      <div className="item-buttons">
        <div className="butt-container">
          <button onClick={() => props.approveAuction(props.item.auctionId)}>
            <CheckIcon className="icon" />
          </button>
          <label>Approve</label>
        </div>
        <div className="butt-container">
          <button>
            <XIcon className="icon" />
          </button>
          <label>End</label>
        </div>
        <div className="butt-container">
          <button>
            <TrashIcon className="icon" />
          </button>
          <label>Cancel</label>
        </div>
      </div>
    </AUCTION_ITEM_COTAINER>
  );
}
