import { ReactNode } from 'react';

import Layout from '~/components/global/Layout/Layout';
import Sidebar from '~/components/global/SideBar/Sidebar';

interface Props {
  children: ReactNode;
}

function App({ children }: Props) {
  return (
    <div className="flex">
      <Sidebar />
      <Layout>{children}</Layout>
    </div>
  );
}

export default App;
