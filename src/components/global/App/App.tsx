import { Web3ReactProvider } from '@web3-react/core';
import { ReactNode } from 'react';

import Layout from '~/components/global/Layout/Layout';
import Sidebar from '~/components/global/SideBar/Sidebar';
import getLibrary from '~/lib/utils/getLibrary';

interface Props {
  children: ReactNode;
}

function App({ children }: Props) {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <div className="flex">
        <Sidebar />
        <Layout>{children}</Layout>
      </div>
    </Web3ReactProvider>
  );
}

export default App;
