import styled from '@emotion/styled';
import React from 'react';
import { useSelector } from 'react-redux';

import ConnectWallet from '~/components/pages/Bridge/ConnectWallet/ConnectWallet';
import { store } from '~/state/store';
import { openOption } from '~/state/utils/actions';

const CONTAINER = styled.div`
  background-color: rgb(1, 1, 1, 0.2);
  position: absolute;
  top: 0;
  z-index: 1;
  height: 50px;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  & > .connect-wallet {
    padding-right: 10px;
    & > .container {
      padding-top: 20px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      align-content: center;
    }
  }
  & > .waiting-indicator {
    position: relative;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-right: 20px;
    & > svg {
      color: white;
      background-color: bg-gray-800;
      border-radius: 100%;
    }
    & > .count {
      position: absolute;
      font-size: 15px;
      font-weight: 900;
      color: white;
      bottom: 0px;
      right: 0px;
    }
  }
`;

export default function Header() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const data = useSelector((state: any) => state.assetCheckReducer);
  function toggleElement() {
    store.dispatch(openOption());
  }
  return (
    <CONTAINER>
      <div className="waiting-indicator" onClick={() => toggleElement()}>
        <div className="count">{data.length ? data.length : null}</div>
        <svg
          className="w-8 h-8 text-blue-700"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>
      </div>
      <div className="connect-wallet">
        <ConnectWallet onClick={() => {}} />
      </div>
    </CONTAINER>
  );
}
