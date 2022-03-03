import styled from '@emotion/styled';
import {
  ArrowCircleLeftIcon,
  ArrowCircleRightIcon,
} from '@heroicons/react/solid';
import { Web3ReactProvider } from '@web3-react/core';
import { ReactNode, useState } from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';

import Alert from '~/components/global/Alert/Alert';
import { AlertType } from '~/components/global/Alert/Alert.types';
import Layout from '~/components/global/Layout/Layout';
import Sidebar from '~/components/global/SideBar/Sidebar';
import Table from '~/components/global/Table/Table';
import Web3Manager from '~/components/global/Web3Manager/Web3Manager';
import getLibrary from '~/lib/utils/getLibrary';
import { store } from '~/state/store';

interface Props {
  children: ReactNode;
}

const HEADER_CONTAINER = styled.div`
  border-bottom-right-radius: 50%;
  z-index: 10;
  position: absolute;
  top: 0px;
  background-color: #ccc;
  height: 60px;
  width: 60px;
  &:hover {
    cursor: pointer;
  }
  .icon {
    color: purple;
  }
  ${'@media (min-width: 601px)'} {
    display: none;
  }
`;
interface SIDER_SHOW {
  show: boolean;
}
const SIDER_CONTAINER = styled.div<SIDER_SHOW>`
  overflow: hidden;
  padding: 0;
  margin: 0;
  height: 100vh;
  fontweight: 500;
  background-color: #141414;
  maxwidth: 180px;
  padding: 20px;
  ${'@media (max-width: 601px)'} {
    display: ${(SIDER_SHOW: { show: boolean }) =>
      SIDER_SHOW.show ? 'flex' : 'none'};
    width: 300px;
  }
`;

function App({ children }: Props) {
  const [showSider, setShowSider] = useState<boolean>(false);
  function sliderToggle() {
    setShowSider(showSider ? false : true);
  }
  return (
    <Provider store={store}>
      <Web3ReactProvider getLibrary={getLibrary}>
        <Web3Manager>
          <div className="flex">
            <SIDER_CONTAINER show={showSider}>
              <Sidebar />
            </SIDER_CONTAINER>

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                overflow: 'hidden',
                position: 'relative',
                width: '100%',
              }}
            >
              <HEADER_CONTAINER>
                {showSider ? (
                  <ArrowCircleLeftIcon
                    className="icon"
                    onClick={sliderToggle}
                  />
                ) : (
                  <ArrowCircleRightIcon
                    className="icon"
                    onClick={sliderToggle}
                  />
                )}
              </HEADER_CONTAINER>
              <Layout>{children}</Layout>
              <div
                style={{
                  bottom: '0',
                  right: '10px',
                  position: 'absolute',
                }}
              >
                <ErrorNotification />
              </div>
              <BridgeWaitingTable />
            </div>
          </div>
        </Web3Manager>
      </Web3ReactProvider>
    </Provider>
  );
}

export default App;

function ErrorNotification() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const isOpen = useSelector((state: any) => state.errorReducer.isOpen);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const error = useSelector((state: any) => state.errorReducer.error);

  const dispatch = useDispatch();

  function handleClose() {
    dispatch({ type: 'HIDE_ERROR' });
  }

  return (
    <>
      {isOpen && error && (
        <div className="fancy-error-class">
          <button onClick={handleClose}>
            <Alert type={AlertType.ERROR} text={error} />
          </button>
        </div>
      )}
    </>
  );
}

function BridgeWaitingTable() {
  const isOpen = useSelector(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (state: any) => state.toggleElementsReducer.isOpen,
  );
  return (
    <>
      {isOpen && (
        <div
          style={{
            alignItems: 'center',
            backgroundColor: 'rgb(1,1,1,0.5)',
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            justifyContent: 'flex-start',
            overflow: 'scroll',
            paddingTop: '100px',
            position: 'absolute',
            width: '100%',
          }}
        >
          <Table />
        </div>
      )}
    </>
  );
}
