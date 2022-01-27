import 'react-calendar/dist/Calendar.css';

import Image from 'next/image';
import { useState } from 'react';
import Calendar from 'react-calendar';

import Button from '~/components/global/Button/Button';
import Select from '~/components/global/Select/Select';

import { mockProducts } from '../Landmarket/items.mock';
import LandDetailModal from './LandDetailModal/LandDetailModal';

function LandContainer(_props: { x: string; y: string }) {
  const [platformSelection, setPlatformSelection] = useState<string>('0');
  const [leaseType, setLeaseType] = useState<string>('0');
  const [value, onChange] = useState(new Date());
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  return (
    <div className="container mx-auto max-h-screen flex flex-col p-10 overflow-scroll">
      <div>
        <div className="flex home-search-form">
          <Select
            label="Platform:"
            defaultValue={platformSelection}
            onChange={(e) =>
              setPlatformSelection(e.value != '0' ? e.value : platformSelection)
            }
            options={[
              { text: 'All', value: '0' },
              { text: 'Decentraland', value: '1' },
              { text: 'The Sandbox', value: '2' },
            ]}
          ></Select>
          <Select
            label="Availability:"
            defaultValue={leaseType}
            onChange={(e) => setLeaseType(e.value != '0' ? e.value : leaseType)}
            options={[
              { text: 'All', value: '0' },
              { text: 'Available', value: '1' },
              { text: 'Leased', value: '2' },
            ]}
          ></Select>
          <div className="flex items-end">
            <Button>Search</Button>
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-5">
        <div className="flex flex-col justify-center items-center">
          <Image
            src={`https://api.decentraland.org/v1/parcels/${_props.x}/${_props.y}/map.png`}
            className="rounded-lg mr-5 mb-5"
            alt="land image"
            height={400}
            width={400}
          />
        </div>
        <div className="ml-5">
          <h5 className="text-xl mb-5">Plot size</h5>
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
        <Button onClick={toggleModal}>Request to Rent</Button>
      </div>
      <LandDetailModal
        isOpen={isModalOpen}
        onClose={toggleModal}
        x={_props.x}
        y={_props.y}
      />
    </div>
  );
}

export default LandContainer;
