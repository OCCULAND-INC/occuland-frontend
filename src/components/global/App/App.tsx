import { Web3ReactProvider } from '@web3-react/core';
import { ReactNode } from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';

import Alert from '~/components/global/Alert/Alert';
import { AlertType } from '~/components/global/Alert/Alert.types';
import Layout from '~/components/global/Layout/Layout';
import Sidebar from '~/components/global/SideBar/Sidebar';
import Table from '~/components/global/Table/Table';
import Web3Manager from '~/components/global/Web3Manager/Web3Manager';
import getLibrary from '~/lib/utils/getLibrary';
import { store } from '~/state/store';

import Header from '../Header/Header';

interface Props {
  children: ReactNode;
}

function App({ children }: Props) {
  return (
    <Provider store={store}>
      <Web3ReactProvider getLibrary={getLibrary}>
        <Web3Manager>
          <div className="flex">
            <Sidebar />
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
              <Header />
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
              <div
                style={{
                  alignItems: 'center',
                  //backgroundColor: 'rgb(1,1,1,0.5)',
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
                <BridgeWaitingTable />
              </div>
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
  return <Table />;
}
