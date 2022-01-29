import styled from '@emotion/styled';
import React from 'react';

import ConnectWallet from '~/components/pages/Bridge/ConnectWallet/ConnectWallet';

const CONTAINER = styled.div`
  background-color: rgb(1, 1, 1, 0.2);
  position: absolute;
  top: 0;
  z-index: 1;
  height: 50px;
  width: 100%;
  display: flex;
  flex-direction: row;
  & > .connect-wallet {
    & > .container {
      display: flex;
      justify-content: flex-start;
    }
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
  }
`;

export default function Header() {
  return (
    <CONTAINER>
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="red"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
        ></path>
      </svg>
      <div className="connect-wallet">
        <ConnectWallet onClick={() => {}} />
      </div>
    </CONTAINER>
  );
}
