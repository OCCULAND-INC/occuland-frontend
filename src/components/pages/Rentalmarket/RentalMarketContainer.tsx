/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable sort-keys */
/* eslint-disable no-console */
import styled from '@emotion/styled';
import { createClient } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

import LoadingSm from '~/components/global/Loading/LoadingSm';

import { LOADING_STATE } from '../loading.types';
import RentalsElements from './RentalsElement';

const supabase = createClient(
  'https://gjlbvpaiezrovocjokmk.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdqbGJ2cGFpZXpyb3ZvY2pva21rIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDQzMzM4NTUsImV4cCI6MTk1OTkwOTg1NX0.Er7P__CL1qse_GnYZu7nl9nV2OSsPFVVv7nGo7AYNbw',
);

interface RentalData {
  available: string;
  created_at: string;
  frequency: string;
  id: number;
  name: string;
  platform: string;
  plot_coords: string;
  plot_link: string;
  rate: string;
}

/*const getItems = () =>
  // eslint-disable-next-line no-async-promise-executor
  new Promise(async (resolve: any, reject: any) => {
    const { data, error } = await supabase.from('rentals').select('*');
    if (!error) {
      await data?.map((el: RentalData[]) => {
        return el;
      });
      resolve(data);
    } else {
      reject(error);
    }
  });*/

const CONTAINER = styled.div`
  height: 100vh;
  position: relative;
  box-sizing: border-box;
  background-color: white;
  overflow: auto;
  display: flex;
  flex-direction: column;
  padding: 0;
  margin: 0;
  .is {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
  }
  ${'@media (max-width: 601px)'} {
    width: 100vw;
    .is {
      .pcc {
        width: 90%;
      }
    }
  }
`;
const getItems = (offset: number, asc: boolean) =>
  // eslint-disable-next-line no-async-promise-executor
  new Promise(async (resolve: any, reject: any) => {
    const { data, error, count } = await supabase
      .from('rentals')
      .select('*', {
        count: 'exact',
      })
      .order('rate', { ascending: asc })
      .range(offset - 11, offset);
    if (!error) {
      await data?.map((el: any) => {
        return el;
      });
      resolve([data, count]);
    } else {
      reject(error);
    }
  });

export default function RentalsContainer() {
  //const context = useWeb3React<Web3Provider>();
  const [loading, setLoading] = useState<LOADING_STATE>(LOADING_STATE.INIT);
  const [rentalData, setRentalData] = useState<RentalData[]>([]);
  const [itemCounts, setItemCounts] = useState(0);
  const [itemOffset, setItemOffset] = useState(11);
  const [itemsSort] = useState<boolean>(true);
  const [currPage, setCurrPage] = useState(1);

  useEffect(() => {
    getItems(itemOffset, itemsSort)
      .then((result: any) => {
        setRentalData((prevItem: any) => [...prevItem, ...result[0]]);
        setItemCounts(result[1]);
        //setPageCount(Math.ceil(result[1] / 9));
        setTimeout(() => setLoading(LOADING_STATE.OFF), 2000);
      })
      .catch(() => {
        setLoading(LOADING_STATE.ERROR);
      });
  }, []);

  const nextPageClick = () => {
    handlePageClick(currPage + 1);
  };
  const handlePageClick = (event: any) => {
    setCurrPage(event);
    const newOffset = (event * 11) % itemCounts;
    setItemOffset(newOffset);
    getItems(newOffset, itemsSort)
      .then((result: any) => {
        setRentalData((prevItem: any) => [...prevItem, ...result[0]]);
      })
      .catch(() => {
        setLoading(LOADING_STATE.ERROR);
      });
  };
  return (
    <CONTAINER id="scrollableDiv">
      <InfiniteScroll
        className="is"
        dataLength={rentalData.length}
        next={nextPageClick}
        // eslint-disable-next-line react/jsx-boolean-value
        hasMore={true}
        loader={<h4 style={{ width: '100%' }}>Loading...</h4>}
        scrollableTarget="scrollableDiv"
      >
        <RentalsElements assets={rentalData} />
      </InfiniteScroll>

      {loading == LOADING_STATE.INIT ? <LoadingSm /> : null}
    </CONTAINER>
  );
}
