import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

function Backdrop({ children }: Props) {
  return (
    <div
      css={{ background: 'rgb(1, 1, 1, 0.8)' }}
      className="absolute top-0 left-0 w-full h-full flex justify-center z-50"
    >
      {children}
    </div>
  );
}

export default Backdrop;
