import { Web3ReactProvider } from '@web3-react/core';
import { ReactNode } from 'react';
import { MoralisProvider } from 'react-moralis';
import { Provider } from 'react-redux';

import Layout from '~/components/global/Layout/Layout';
import Sidebar from '~/components/global/SideBar/Sidebar';
import Web3Manager from '~/components/global/Web3Manager/Web3Manager';
import getLibrary from '~/lib/utils/getLibrary';
import { store } from '~/state/store';

import Header from '../Header/Header';

interface Props {
  children: ReactNode;
}

const moralisConfig =
  process.env.NODE_ENV === 'development'
    ? {
        appId: process.env.MORALIS_LOCAL_APP_ID || '',
        serverUrl: process.env.MORALIS_TESTNET_SERVER_URL || '',
      }
    : {
        appId: process.env.MORALIS_TESTNET_APP_ID || '',
        serverUrl: process.env.MORALIS_TESTNET_SERVER_URL || '',
      };

function App({ children }: Props) {
  return (
    <Provider store={store}>
      <MoralisProvider {...moralisConfig} initializeOnMount>
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
              </div>
            </div>
          </Web3Manager>
        </Web3ReactProvider>
      </MoralisProvider>
    </Provider>
  );
}

export default App;
