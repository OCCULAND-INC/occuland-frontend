/* eslint-disable @typescript-eslint/no-explicit-any */
import { createClient } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

import Filter from '~/components/global/Filter/Filter';

import { LOADING_STATE } from '../loading.types';
import LandCard from './LandCard';
import LandInfoModal from './LandInfoModal';
import ScrollIndicator from './ScrollIndicator';

const supabase = createClient(
  'https://gjlbvpaiezrovocjokmk.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdqbGJ2cGFpZXpyb3ZvY2pva21rIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDQzMzM4NTUsImV4cCI6MTk1OTkwOTg1NX0.Er7P__CL1qse_GnYZu7nl9nV2OSsPFVVv7nGo7AYNbw',
);

const getItems = (offset: number) =>
  // eslint-disable-next-line no-async-promise-executor
  new Promise(async (resolve: any, reject: any) => {
    const { data, error, count } = await supabase
      .from('land_for_sale')
      .select('*', {
        count: 'exact',
      })
      .order('price_easy', { ascending: true })
      .range(offset - 11, offset);
    if (!error) {
      await data?.map((el: any) => {
        el['x_coord'] = el['img'].split('/parcels/')[1].split('/')[0];
        el['y_coord'] = el['img'].split('/parcels/')[1].split('/')[1];

        return el;
      });
      resolve([data, count]);
    } else {
      reject(error);
    }
  });

const getPrice = async (setPriceUsd: (e: number) => void) => {
  fetch(
    'https://deep-index.moralis.io/api/v2/erc20/0x0f5d2fb29fb7d3cfee444a200298f468908cc942/price',
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
      // eslint-disable-next-line no-console
      console.log(res['usdPrice']);
      setPriceUsd(res['usdPrice']);
    })
    .catch((err) => {
      console.error(err);
    });
};
const getLandDetails = async (
  tokenId: string,
  setLandDetails: (e: any) => void,
) => {
  fetch(
    `https://api.decentraland.org/v2/contracts/0xf87e31492faf9a91b02ee0deaad50d51d56d5d4d/tokens/${tokenId}`,
    {
      method: 'GET',
      headers: {},
    },
  )
    .then(async (res) => {
      const response = await res.json();
      setLandDetails(response);
    })
    .catch((err) => {
      console.error(err);
    });
};
const insertLead = async (calendly: string, assetId: string) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data, error } = await supabase
    .from('calendly')
    .insert({ calendly, assetId }, { returning: 'minimal' });
};

function LandsaleContainer() {
  const [loading, setLoading] = useState<LOADING_STATE>(LOADING_STATE.INIT);
  const [items, setItems] = useState<any[]>([]);
  const [itemCounts, setItemCounts] = useState(0);
  const [itemOffset, setItemOffset] = useState(11);
  const [currPage, setCurrPage] = useState(1);
  const [manaUSDPrice, setManaUSDPrice] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [selectedCard, setSelectedCard] = useState<any>();
  const [cardDetails, setCardDetails] = useState([]);

  useEffect(() => {
    getPrice(setManaUSDPrice);
    getItems(itemOffset)
      .then((result: any) => {
        setItems((prevItem: any) => [...prevItem, ...result[0]]);
        setItemCounts(result[1]);
        //setPageCount(Math.ceil(result[1] / 9));
        setLoading(LOADING_STATE.OFF);
      })
      .catch(() => {
        setLoading(LOADING_STATE.ERROR);
      });
  }, []);

  const handleCardClick = (id: number, obj: any) => () => {
    getPrice(setManaUSDPrice);
    setCardDetails([]);
    getLandDetails(obj['tokenId'], (e: any) => setCardDetails(e));
    setSelectedCard(obj);
    setShowModal(true);
  };

  const nextPageClick = () => {
    handlePageClick(currPage + 1);
  };
  const handlePageClick = (event: any) => {
    setCurrPage(event);
    const newOffset = (event * 11) % itemCounts;
    setItemOffset(newOffset);
    getItems(newOffset)
      .then((result: any) => {
        setItems((prevItem: any) => [...prevItem, ...result[0]]);
      })
      .catch(() => {
        setLoading(LOADING_STATE.ERROR);
      });
  };

  if (loading == 'INIT') {
    return <div>loading . . .</div>;
  }
  return (
    <div className="xs:max-h-screen xs:flex xs:flex-wrap xs:overflow-x-hidden xs:overflow-y-scroll sm:container sm:mx-auto sm:max-h-screen sm:flex sm:flex-wrap">
      <Filter />
      <div
        id="scrollableDiv"
        style={{
          display: 'flex',
          flexDirection: 'column',
          flexWrap: 'wrap',
          height: '100vh',
          overflow: 'auto',
          width: '100%',
        }}
      >
        <LandInfoModal
          show={showModal}
          ShowModal={() => setShowModal(false)}
          card={selectedCard}
          item={cardDetails}
          usdPrice={manaUSDPrice}
          addLead={insertLead}
        />
        <ScrollIndicator />
        <InfiniteScroll
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            height: '100%',
            justifyContent: 'center',
            width: '100%',
          }}
          dataLength={items.length}
          next={nextPageClick}
          // eslint-disable-next-line react/jsx-boolean-value
          hasMore={true}
          loader={<h4 style={{ width: '100%' }}>Loading...</h4>}
          scrollableTarget="scrollableDiv"
        >
          {items.map((obj: any, index: any) => (
            <LandCard
              key={index}
              imageUrl={`https://api.decentraland.org/v1/parcels/${obj['x_coord']}/${obj['y_coord']}/map.png`}
              className="mb-5 cursor-pointer"
              x={obj['x_coord']}
              y={obj['y_coord']}
              price={obj['price_easy']}
              usdPrice={manaUSDPrice}
              onClick={handleCardClick(index, obj)}
            />
          ))}
        </InfiniteScroll>
      </div>
    </div>
  );
}

export default LandsaleContainer;
