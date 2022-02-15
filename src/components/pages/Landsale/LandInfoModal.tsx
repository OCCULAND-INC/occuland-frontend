/* eslint-disable @typescript-eslint/no-explicit-any */
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { CalendlyEventListener, PopupButton } from 'react-calendly';
import ClipLoader from 'react-spinners/ClipLoader';

interface StyledProps {
  show: any;
}
const MODAL_CONTAINER = styled.div<StyledProps>`
  z-index: 10;
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
              margin-bottom: 5px;
            }
            .email-container {
              width: 50%;
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
export default function LandInfoModal(props: any) {
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
  function bookButtonClicked() {
    console.log('bookButtonClicked');
  }
  function eventScheduled(obj: any) {
    console.log(obj);
  }
  return (
    <MODAL_CONTAINER show={props.show}>
      <CalendlyEventListener
        onEventTypeViewed={bookButtonClicked}
        onEventScheduled={(data: any) => eventScheduled(data)}
      >
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
                    {/* <input
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
            </button>*/}
                    <PopupButton
                      text="Book a Meeting"
                      url="https://calendly.com/occuland/virtual-land-informational"
                      styles={{
                        border: 'solid 10x red',
                        height: '30px',
                        width: '100%',
                      }}
                    />
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
      </CalendlyEventListener>
    </MODAL_CONTAINER>
  );
}
