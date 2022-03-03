/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable sort-keys */
/* eslint-disable no-console */
import { Web3Provider } from '@ethersproject/providers';
import { useWeb3React } from '@web3-react/core';
import { AuctionHouse, Zora } from '@zoralabs/zdk';
import { ethers, Wallet } from 'ethers';
import { useEffect, useState } from 'react';

import LoadingSm from '~/components/global/Loading/LoadingSm';

import { LOADING_STATE } from '../loading.types';
import AuctionsElements from './AuctionsElement';

/*const supabase = createClient(
  'https://gjlbvpaiezrovocjokmk.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdqbGJ2cGFpZXpyb3ZvY2pva21rIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDQzMzM4NTUsImV4cCI6MTk1OTkwOTg1NX0.Er7P__CL1qse_GnYZu7nl9nV2OSsPFVVv7nGo7AYNbw',
);*/

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
const getAllAssetsFromOwner = async (
  wallet_address: string,
  contract_address: string,
  chain: string,
  //setLoading?: (e: LOADING_STATE) => void,
  assets: MoralisNFT[],
  setAssets: (e: MoralisNFT[]) => void,
  setLoading: (e: LOADING_STATE) => void,
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
        setAssets([...assets, ...out]);
        console.log('turn off loading');
        setTimeout(() => setLoading(LOADING_STATE.OFF), 3000);
      } else {
        setTimeout(() => setLoading(LOADING_STATE.OFF), 3000);
      }
    })
    .catch((err) => {
      console.error(err);
      setLoading(LOADING_STATE.ERROR);
    });
};

const getAllAuctionsByOwner = async (
  token_owner: string,
  cb: (e: any) => void,
) => {
  fetch('https://indexer-dev-rinkeby.zora.co/v1/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: '{"query":"{\\n  Auction(\\n    where: {curator: {_ilike: \\"0x4e9becbfe8170e94b06db6041a1937eee28534e7\\"}, \\nstatus: { _in: [\\"APPROVED\\", \\"IN_PROGRESS\\"]},\\n\\t\\t\\ttokenContract: {_in: [\\"0x05EE40Ee0A0579EaF609cA456a76e32567E263B8\\"]}\\n\\t}\\n\\n  ) {\\n\\t\\t\\tauctionId\\n\\t\\t\\ttokenId\\n\\t\\t\\ttokenContract\\n\\t\\t\\ttokenOwner\\n\\t\\t\\tapproved\\n\\t\\t\\tduration\\n\\t\\t\\tfirstBidTime\\n\\t\\t\\treservePrice\\n\\t\\t\\tcuratorFeePercentage\\n\\t\\t\\tauctionCurrency\\n\\t\\t\\tlastBidder\\n\\t\\t\\tlastBidAmount\\n\\t\\t\\tauction_status: status\\n  }\\n}\\n "}',
  })
    .then(async (response) => {
      const output = await response.json();
      cb(output);
    })
    .catch((err) => {
      console.error(err);
    });
};

/*const storeAuctionInDb = async (
  address: string,
  contractAddress: string,
  tokenId: string,
  hash: string,
  auctionId: string,
) => {
  const { data } = await supabase.from('auctions').insert(
    {
      address,
      contract_address: contractAddress,
      token_id: tokenId,
      txn_hash: hash,
      auction_id: auctionId,
    },
    { returning: 'minimal' },
  );
  return data;
};

const getAuctionId = async (
  transaction_hash: string,
  cb: (e: string) => void,
) => {
  fetch('https://indexer-dev-rinkeby.zora.co/v1/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    // eslint-disable-next-line no-useless-escape
    body: `{\"query\":\"{\\n  AuctionCreatedEvent(\\n    where: {transactionHash: {_eq: \\\"${transaction_hash}\\\"}}\\n\\n  ) {\\n\\t\\tauctionId\\n  }\\n}\\n \"}`,
  })
    .then(async (response) => {
      const res = await response.json();
      cb(res['data']['AuctionCreatedEvent'][0]['auctionId']);
    })
    .catch(() => {
      return 0;
    });
};

const confirmCanceledAuction = async (txn_hash: string) => {
  console.log(txn_hash);
  const { data, error } = await supabase.rpc('get_canceled_event', {
    transactionhash: txn_hash,
  });
  console.log(data);
  console.log(error);
};*/
export default function ProfileContainer() {
  //const { connector } = useWeb3React<Web3Provider>();
  const context = useWeb3React<Web3Provider>();
  const [loading, setLoading] = useState<LOADING_STATE>(LOADING_STATE.INIT);
  const [signer, setSigner] = useState<any>();
  const [signerAddress, setSignerAddress] = useState('');
  const [auctionHouse, setAuctionHouse] = useState<any>(undefined);
  const [zora, setZora] = useState<any>(undefined);
  const [assets, setAssets] = useState<MoralisNFT[]>([]);
  //const [location, setLocation] = useState<USER_LOCATION>(USER_LOCATION.ASSETS);
  const [itemsOnAuction, setItemsOnAuction] = useState<itemsOnAuctionV2[]>([]);
  const [acc, setAcc] = useState<string>();

  useEffect(() => {
    if (context.library && context.account) {
      setLoading(LOADING_STATE.INIT);
      const pr = new ethers.providers.Web3Provider(context.library.provider);
      const _signer = pr.getSigner();
      setSigner(_signer);
      setSignerAddress(context.account);
      getAllAuctionsByOwner(context.account, (x: DataAuction) => {
        setItemsOnAuction(x.data.Auction);
      });
    } else {
      //const wallet = Wallet.createRandom();
      setAcc(Wallet.createRandom()['address']);
      getAllAuctionsByOwner('', (x: DataAuction) => {
        setItemsOnAuction(x.data.Auction);
      });
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
      console.log('checking assets');
      getAllAssetsFromOwner(
        signerAddress,
        '0x05EE40Ee0A0579EaF609cA456a76e32567E263B8',
        '0x4',
        assets,
        setAssets,
        setLoading,
      );
      //setAssets((prev) => [...prev, ...data]);
    }
  }, [zora]);

  const makeBids = async (_auction_id: string, _amount: string) => {
    try {
      setLoading(LOADING_STATE.INIT);
      const res = await auctionHouse.createBid(_auction_id, '9000');
      console.log(res);
      refreshData();
    } catch (e) {
      setLoading(LOADING_STATE.OFF);
      console.log(e);
    }
  };

  const refreshData = async () => {
    console.log('checking refresh');
    if (context.account) {
      console.log('about to refresh account');
      await getAllAuctionsByOwner(context.account, (x: DataAuction) => {
        setItemsOnAuction(x.data.Auction);
        console.log('refreshed account');
      });
      console.log('getting assets');
      await getAllAssetsFromOwner(
        signerAddress,
        '0x05EE40Ee0A0579EaF609cA456a76e32567E263B8',
        '0x4',
        [],
        setAssets,
        setLoading,
      );
      console.log('got assets');
    } else {
      setLoading(LOADING_STATE.OFF);
    }
  };

  /*async function mockStore() {
    storeAuctionInDb(
      '0x859bbcb0cb78bA92d9a6E683Ae43Ee5094d2fC1B',
      '0x05ee40ee0a0579eaf609ca456a76e32567e263b8',
      '14',
      '0xb3b85bd477e32b7bf4716ddee7ff0b0b23e0dbe9e8f1ebed3026c4588233c421',
    );
    getAuctionId(
      '0xb3b85bd477e32b7bf4716ddee7ff0b0b23e0dbe9e8f1ebed3026c4588233c421',
      (res: string) => {
        storeAuctionInDb(
          context.account ? context.account : '',
          contractAddress,
          tokenId,
          receipt.transactionHash,
          res,
        );
      },
    );
  }
  */

  return (
    <div
      style={{
        height: '100vh',
        position: 'relative',
        boxSizing: 'border-box',
        backgroundColor: 'white',
        display: 'flex',
      }}
    >
      <AuctionsElements
        account={context.account || acc}
        assets={itemsOnAuction}
        makeBid={makeBids}
      />
      {loading == LOADING_STATE.INIT ? <LoadingSm /> : null}
    </div>
  );
}
