/* eslint-disable sort-keys */
import styled from '@emotion/styled';

import { Platforms } from '~/assets/platforms/Plaforms';

import ConnectWallet from '../../Bridge/ConnectWallet/ConnectWallet';

interface AuctionsContainer {
  account?: string;
  assets: itemsOnAuctionV2[];
  cancelAuction: (e: string) => void;
}

interface itemsOnAuction {
  auction_approved: boolean;
  auction_currency: string;
  auction_id: string;
  auction_status: string;
  curator_fee_perc: string;
  duration: string;
  first_bid_time: string;
  last_bid_amount: string;
  last_bidder: string;
  reserve_price: string;
  token_address: string;
  token_id: string;
  token_owner: string;
  txn_hash: string;
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

const PROFILE_CONTENT_CONTAINER = styled.div`
  margin: 70px 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100vw;
  box-sizing: border-box;
`;
const PROFILE_CONTENT_MAIN = styled.div`
  padding-left: 40px;
  padding-right: 40px;
  height: 100%;
  width: 95%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  overflow: scroll;
  padding-bottom: 100px;
`;
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

const NO_DATA = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-weight: 600;
  color: #141414;
  h2 {
    font-size: 24px;
  }
  a {
    font-size: 20px;
    font-weight: 500;
    color: #141414;
    opacity: 0.8;
  }
`;
function MoralisNFTCard(props: {
  item: itemsOnAuctionV2;
  onClick: (e: string) => void;
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
        <LabelRow label="Auction ID" title={props.item.auctionId} />
        <LabelRow label="NFT ID" title={props.item.tokenId} />
        <LabelRow label="Status" title={props.item.auction_status} />
      </div>
      <div className="button-container">
        <button onClick={() => props.onClick(props.item.auctionId)}>
          Cancel Auction
        </button>
      </div>
      <div className="footer-image">
        <img src={platformurl} />
      </div>
    </MORALIS_CARD>
  );
}

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

export default function AuctionsContainer(props: AuctionsContainer) {
  return (
    <PROFILE_CONTENT_CONTAINER>
      {props.account ? (
        <PROFILE_CONTENT_MAIN>
          {props.assets.length > 0 ? (
            props.assets.map((item: itemsOnAuctionV2, index: number) => (
              <MoralisNFTCard
                key={index}
                item={item}
                onClick={(e: string) => props.cancelAuction(e)}
              ></MoralisNFTCard>
            ))
          ) : (
            <NO_DATA>
              <h2>No Land Assets Found</h2>
              <a>Head to Land Auctions to make a purchase!</a>
            </NO_DATA>
          )}
        </PROFILE_CONTENT_MAIN>
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
    </PROFILE_CONTENT_CONTAINER>
  );
}
