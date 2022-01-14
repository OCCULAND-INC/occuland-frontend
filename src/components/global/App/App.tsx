import { Web3ReactProvider } from '@web3-react/core';
import { ReactNode } from 'react';
import { Provider } from 'react-redux';

import Layout from '~/components/global/Layout/Layout';
import Sidebar from '~/components/global/SideBar/Sidebar';
import Web3Manager from '~/components/global/Web3Manager/Web3Manager';
import getLibrary from '~/lib/utils/getLibrary';
import { store } from '~/state/store';

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
            <Layout>{children}</Layout>
          </div>
        </Web3Manager>
      </Web3ReactProvider>
    </Provider>
  );
}

export default App;
