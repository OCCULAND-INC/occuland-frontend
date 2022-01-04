import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

function Layout({ children }: Props) {
  return <main className="grow">{children}</main>;
}

export default Layout;
