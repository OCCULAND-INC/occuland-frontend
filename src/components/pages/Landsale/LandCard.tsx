/* eslint-disable @typescript-eslint/no-explicit-any */
import styled from '@emotion/styled';

const BROKERCARD = styled.div`
  border-radius: 5px;
  border: solid 1.5px #ccc;
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
        font-size: 12px;
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

export default function LandCard(props: any) {
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
