import 'react-calendar/dist/Calendar.css';

import Image from 'next/image';
import { useState } from 'react';
import Calendar from 'react-calendar';

import Button from '~/components/global/Button/Button';
import Input from '~/components/global/Input/Input';

import { mockProducts } from '../Landmarket/items.mock';
import LandDetailModal from './LandDetailModal/LandDetailModal';

function LandContainer() {
  const [value, onChange] = useState(new Date());
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="container mx-auto max-h-screen flex flex-col p-10 overflow-scroll">
      <div>
        <Input placeholder="Platform" className="mr-5" />
        <Input placeholder="Lease" className="mr-5" />
        <Button className="mr-5" onClick={() => {}}>
          Availablity
        </Button>
      </div>
      <div className="flex justify-center mt-5">
        <div>
          <Image
            src="https://picsum.photos/300/300"
            className="rounded-lg mr-5"
            alt="land image"
            height={400}
            width={400}
          />
        </div>
        <div className="ml-5">
          <h5 className="text-xl mb-5" onClick={handleOpenModal}>
            Plot size
          </h5>
          <div className="flex justify-between mb-5">
            <p className="mr-5 text-xl">Daily price </p>
            <p className="font-bold text-gray-900 dark:text-white">
              {mockProducts[0].price + ' ' + mockProducts[0].priceUnit}
            </p>
          </div>
          <div className="flex justify-between mb-5">
            <p className="mr-5 text-xl">Purchace</p>
            <p className="font-bold text-gray-900 dark:text-white">
              {mockProducts[0].purchasePrice + ' ' + mockProducts[0].priceUnit}
            </p>
          </div>
          <div className="mb-5">
            <Calendar onChange={onChange} value={value} />
          </div>
          <div className="flex justify-between mb-5">
            <p className="mr-5 text-xl">Minimum Rent</p>
            <p className="font-bold text-gray-900 dark:text-white">1 day</p>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center">
        <Button onClick={() => {}}>Request Rent</Button>
      </div>
      <LandDetailModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
}

export default LandContainer;
