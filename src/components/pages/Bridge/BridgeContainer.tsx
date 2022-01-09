import Web3Modal from 'web3modal';

import Button from '~/components/global/Button/Button';

function BridgeContainer() {
  const handleConnect = () => {};

  return (
    <div className="container mx-auto h-full flex flex-col justify-center items-center">
      <Button onClick={handleConnect}>Connect</Button>
    </div>
  );
}

export default BridgeContainer;
