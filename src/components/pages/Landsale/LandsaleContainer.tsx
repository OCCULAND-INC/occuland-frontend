/* eslint-disable @typescript-eslint/no-explicit-any */
import styled from '@emotion/styled';
import { createClient } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';
import ClipLoader from 'react-spinners/ClipLoader';

import { LOADING_STATE } from '../loading.types';

const supabase = createClient(
  'https://gjlbvpaiezrovocjokmk.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdqbGJ2cGFpZXpyb3ZvY2pva21rIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDQzMzM4NTUsImV4cCI6MTk1OTkwOTg1NX0.Er7P__CL1qse_GnYZu7nl9nV2OSsPFVVv7nGo7AYNbw',
);

const PAGINATION = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 10;
  background-color: white;
  color: black;
  width: 100%;
  height: 50px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  .page-control {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    ul {
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: center;
      padding: 0;
      margin: 0;
      li {
        padding: 0px 3%;
        button {
          background-color: purple;
          color: white;
          padding: 10px;
          width: 130px;
          border-radius: 10px;
          font-weight: 800;
        }
        select {
          border-radius: 10px;
          text-align: center;
          color: purple;
          border: solid purple 0.5px;
        }
      }
    }
  }
  .page-li {
    background-color: #efefef;
    width: 30px;
    border: solid 1px #ccc;
    margin: 0px 10px;
    text-align: center;
    font-weight: 700;
  }
  .pagination {
    display: flex;
    flex-direction: row;
  }
`;

const getItems = (offset: number) =>
  // eslint-disable-next-line no-async-promise-executor
  new Promise(async (resolve: any, reject: any) => {
    const { data, error, count } = await supabase
      .from('land_for_sale')
      .select('*', {
        count: 'exact',
      })
      .order('price_easy', { ascending: true })
      .range(offset - 8, offset);
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
const insertLead = async (email: string, assetId: string) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data, error } = await supabase
    .from('leads')
    .insert({ email, assetId }, { returning: 'minimal' });
};

function LandsaleContainer() {
  const [loading, setLoading] = useState<LOADING_STATE>(LOADING_STATE.INIT);
  const [items, setItems] = useState([]);
  const [itemCounts, setItemCounts] = useState(0);
  const [itemOffset, setItemOffset] = useState(8);
  const [pageCount, setPageCount] = useState(0);
  const [currPage, setCurrPage] = useState(0);
  const [manaUSDPrice, setManaUSDPrice] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [selectedCard, setSelectedCard] = useState<any>();
  const [cardDetails, setCardDetails] = useState([]);
  const [pages, setPages] = useState([]);

  useEffect(() => {
    getPrice(setManaUSDPrice);
    getItems(itemOffset)
      .then((result: any) => {
        setItems(result[0]);
        setItemCounts(result[1]);
        setPageCount(Math.ceil(result[1] / 9));
        setLoading(LOADING_STATE.OFF);
      })
      .catch(() => {
        setLoading(LOADING_STATE.ERROR);
      });
  }, []);

  useEffect(() => {
    if (pageCount) {
      generatePages();
    }
  }, [pageCount]);

  const generatePages = () => {
    const pg: any = [];
    for (let i = 1; i <= pageCount; i++) {
      pg.push(i);
    }
    setPages(pg);
  };

  const handleCardClick = (id: number, obj: any) => () => {
    getPrice(setManaUSDPrice);
    setCardDetails([]);
    getLandDetails(obj['tokenId'], (e: any) => setCardDetails(e));
    setSelectedCard(obj);
    setShowModal(true);
  };
  const prevPageClick = () => {
    handlePageClick(currPage - 1);
  };
  const nextPageClick = () => {
    handlePageClick(currPage + 1);
  };
  const handlePageClick = (event: any) => {
    // eslint-disable-next-line no-console
    console.log(event);
    setLoading(LOADING_STATE.INIT);
    setCurrPage(event);
    const newOffset = (event * 9) % itemCounts;
    // eslint-disable-next-line no-console
    console.log(`newOffset: ${newOffset}`);
    setItemOffset(newOffset);
    getItems(newOffset)
      .then((result: any) => {
        setItems(result[0]);
        setLoading(LOADING_STATE.OFF);
      })
      .catch(() => {
        setLoading(LOADING_STATE.ERROR);
      });
  };

  if (loading == 'INIT') {
    return <div>loading . . .</div>;
  }
  return (
    <div className="xs:max-h-screen xs:flex xs:flex-wrap xs:overflow-x-hidden xs:overflow-y-scroll sm:container sm:mx-auto sm:max-h-screen sm:flex sm:flex-wrap sm:overflow-scroll">
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          margin: '0px 1%',
          padding: '50px 5%',
          width: '100%',
        }}
      >
        {items.map((obj: any, index: any) => (
          <BrokerCard
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
        <PAGINATION>
          <div className="page-control">
            <ul>
              <li>
                <button onClick={prevPageClick}>{'<< Prev Page'}</button>
              </li>
              <li>
                <select
                  defaultValue={currPage}
                  onChange={(e) => handlePageClick(e.target.value)}
                >
                  {pages.map((el: any, index: any) => (
                    <option key={index} value={el}>
                      {el}
                    </option>
                  ))}
                </select>
              </li>
              <li>
                <button onClick={nextPageClick}>{'Next Page >>'}</button>
              </li>
            </ul>
          </div>
        </PAGINATION>
        <Modal
          show={showModal}
          ShowModal={() => setShowModal(false)}
          card={selectedCard}
          item={cardDetails}
          usdPrice={manaUSDPrice}
          addLead={insertLead}
        />
      </div>
    </div>
  );
}

const BROKERCARD = styled.div`
  border-radius: 5px;
  border: solid 0.5px #ccc;
  height: 320px;
  max-height: 320px;
  width: 300px;
  min-width: 300px;
  margin: 10px;
  position: relative;
  padding: 0px 15px;
  background-color: white;
  position: relative;
  &:hover {
    box-shadow: 0px 0px 15px 1px rgb(1, 1, 1, 0.3);
  }
  a > img {
    width: 100%;
  }
  .overlay {
    border-radius: 20px;
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
  }
  .overlay > div {
    height: 100%;
    background-color: white;
    padding: 0px 10px;
  }
  .overlay > .trans {
    height: 250%;
    background-color: transparent;
  }
  .card-header {
    margin: 0px 15px;
    display: flex;
    flex-direction: row;
    align-items: center;
    ul {
      position: relative;
      padding: 0;
      margin: 0;
      width: 100%;
      list-style: none;
      display: flex;
      flex-direction: row;
      li {
        display: flex;
        flex-direction: row;
        width: 100%;
        padding: 0px 0px;
        align-items: center;
        img {
          height: 20px;
          max-height: 20px;
        }
        span {
          padding-left: 5px;
          font-size: 20px;
          font-weight: 800;
          color: rgb(1, 1, 1, 0.7);
        }
      }
      li:last-child {
        width: 40%;
        display: flex;
        justify-content: center;
        color: rgb(1, 1, 1, 0.5);
      }
    }
  }
  .card-footer {
    margin: 0px 15px;
    display: flex;
    flex-direction: row;
    align-items: center;
    ul {
      width: 100%;
      display: flex;
      flex-direction: row;
      align-items: center;
      li {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        label {
          font-weight: 800;
          color: rgb(1, 1, 1, 0.7);
          border-bottom: solid 0.5px #ccc;
        }
        button {
          font-weight: 800;
          font-size: 20px;
          padding: 2px 20px;
          border: solid 0.5px #ccc;
          border-radius: 5px;
          background-color: #9d5feb;
          color: white;
          box-shadow: 0px 0px 5px 1px rgb(1, 1, 1, 0.3);
          text-align: right;
          :hover {
            background-color: #824dc4;
            box-shadow: 0px 0px 0px 0px rgb(1, 1, 1, 1);
          }
        }
      }
      li::last-child {
        width: 20%;
      }
    }
  }
  .like-button {
    position: absolute;
    top: 0px;
    right: 0px;
    color: red;
    :hover {
      color: white;
      cursor: pointer;
    }
  }
`;

function BrokerCard(props: any) {
  return (
    <BROKERCARD>
      <div>
        <a href="#">
          <img className="rounded-t-lg" src={props.imageUrl} alt="" />
        </a>
        <div className="overlay">
          <div className="card-header">
            <ul>
              <li>
                <img src="https://cryptologos.cc/logos/decentraland-mana-logo.png?v=020"></img>{' '}
                <span>Decentraland</span>
              </li>
              <li>
                ({props.x}, {props.y})
              </li>
            </ul>
          </div>
          <div className="trans"></div>
          <div className="card-footer">
            <ul>
              <li>
                <label>USD</label>
                <span>
                  $
                  {(props.usdPrice * props.price)
                    .toFixed(2)
                    .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}
                </span>
              </li>
              <li>
                <button onClick={props.onClick}>
                  {' '}
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>{' '}
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {/*<div className="like-button">
        <svg
          className="w-6 h-6"
          fill="red"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          ></path>
        </svg>
  </div>*/}
    </BROKERCARD>
  );
}
interface StyledProps {
  show: any;
}
const MODAL_CONTAINER = styled.div<StyledProps>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: ${(StyledProps: any) => (StyledProps.show ? 'flex' : 'none')};
  justify-content: center;
  align-items: center;
  background-color: rgb(1, 1, 1, 0.5);
  .modal-content-container {
    position: relative;
    border-radius: 50px;
    border-top-right-radius: 25px;
    border-bottom-left-radius: 25px;
    background-color: white;
    border: 1px solid #ccc;
    min-height: 300px;
    width: 350px;
    box-shadow: 0px 0px 15px 1px rgb(1, 1, 1, 0.7);
    z-index: 1;
    .modal-content {
      display: flex;
      flex-direction: column;
      height: 100%;
      .content-info {
        padding: 20px;
        border-bottom: solid 1px #ccc;
        height: 100%;
        min-height: 200px;
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        ul {
          li {
            width: 100%;
            font-size: 20px;
            padding: 5px 0px 5px 0px;
            display: flex;
            label {
              font-weight: 800;
              min-width: 100px;
            }
            span {
              padding-left: 5px;
            }
          }
          .tag {
            font-size: 12px;
          }
        }
      }
      .load {
        display: flex;
        flex-direction: column;
        align-items: center;
        justifiy-content: center;
        align-content: center;
        padding-top: 30px;
      }
      .content-options {
        height: 60%;
        width: 100%;
        ul {
          border-top-right-radius: 25px;
          border-bottom-right-radius: 50px;
          padding: 10px;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          align-items: center;
          li {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            width: 100%;
            label {
              font-weight: 600;
              font-size: 20px;
              color: rgb(1, 1, 1, 0.8);
            }
            .email-container {
              width: 90%;
              border: solid 0.5px #ccc;
              border-radius: 10px;
              display: flex;
              flex-direction: row;
              box-shadow: 0px 0px 15px 1px #ccc;
              input {
                width: 100%;
                border: solid 0.5px #ccc;
              }
              button {
                height: 45x;
                width: 10%;
                font-weight: 600;
                display: flex;
                justify-content: center;
                align-items: center;
                :hover {
                  box-shadow: 0px 0px 0px 0px #ccc;
                }
              }
            }
          }
          li:first-child {
            button {
              background-color: rgb(1, 1, 1, 0.3);
              color: white;
              :hover {
                background-color: rgb(1, 1, 1, 0.7);
              }
            }
          }
          li:last-child {
            button {
              background-color: #9d5feb;
              color: white;
              :hover {
                background-color: #824dc4;
              }
            }
          }
        }
      }
    }
    .exit-modal {
      position: absolute;
      top: -7%;
      right: -3%;
      cursor: pointer;
      border-radius: 100%;
    }
  }
`;
function Modal(props: any) {
  const [loading, setLoading] = useState(true);
  const [lead, setLead] = useState<string>('');
  useEffect(() => {
    if (props.item.id) {
      // eslint-disable-next-line no-console
      console.log(props.item);
      setTimeout(() => setLoading(false), 2000);
    }
  }, [props.item]);
  async function addLead() {
    setLoading(true);
    await props.addLead(lead, props.item.id);
    setLead('');
    setTimeout(() => setLoading(false), 2000);
    exitModal();
  }
  function exitModal() {
    setLoading(true);
    props.ShowModal();
  }
  return (
    <MODAL_CONTAINER show={props.show}>
      <div className="modal-content-container">
        <div className="modal-content">
          <div className="content-info">
            {!loading ? (
              <ul>
                <li>
                  <label>MANA:</label>
                  <span>{props.card.price_easy}</span>
                </li>
                <li>
                  <label>USD:</label>
                  <span>
                    $
                    {(props.card.price_easy * props.usdPrice)
                      .toFixed(2)
                      .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}
                  </span>
                </li>
                <label style={{ fontWeight: '800' }}>
                  Proxmity to Public Spaces
                </label>
                {props.item.attributes?.map((el: any, index: number) =>
                  el['trait_type'] != 'X' && el['trait_type'] != 'Y' ? (
                    <li key={index} className="tag">
                      <label>{el['trait_type']}:</label>
                      <span>{el['value']} Parcels</span>
                    </li>
                  ) : null,
                )}
              </ul>
            ) : (
              <div className="load">
                <ClipLoader color={'#C39BD3'} size={120} />
              </div>
            )}
          </div>

          <div className="content-options">
            <ul>
              <li>
                <label>Talk with an Expert:</label>
                <div className="email-container">
                  <input
                    onChange={(e) => setLead(e.target.value)}
                    type="text"
                    placeholder="youremail@email.com"
                  />
                  <button onClick={() => addLead()}>
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                      ></path>
                    </svg>
                  </button>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className="exit-modal" onClick={() => exitModal()}>
          <svg
            className="w-16 h-16"
            fill="purple"
            stroke="white"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
        </div>
      </div>
    </MODAL_CONTAINER>
  );
}

export default LandsaleContainer;
