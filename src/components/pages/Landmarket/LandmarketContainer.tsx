import { useRouter } from 'next/router';
import { useState } from 'react';

import Button from '~/components/global/Button/Button';
import Card from '~/components/global/Card/Card';
import Select from '~/components/global/Select/Select';

import { mockProducts } from './items.mock';

/**
 * @TODO create out of Container component
 */

function LandmarketContainer() {
  const router = useRouter();
  const [platformSelection, setPlatformSelection] = useState<string>(
    (router.query.platform as string) || 'all',
  );
  const [leaseType, setLeaseType] = useState<string>('0');

  console.info(router.query.platform || 'none');

  const handleClick = (id: number, coords: { x: number; y: number }) => () => {
    router.push({
      pathname: `/landmarket/${id}`,
      query: {
        x: coords.x,
        y: coords.y,
      },
    });
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
              { text: 'All', value: 'all' },
              { text: 'Decentraland', value: 'decentraland' },
              { text: 'The Sandbox', value: 'the sandbox' },
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
        <div className="gap-8 columns-3">
          {mockProducts.map(
            ({ price, priceUnit, purchasePrice, title }, index) => (
              <Card
                key={title + index}
                title={price + priceUnit}
                imageUrl={`https://api.decentraland.org/v1/parcels/${
                  index * 6
                }/${index * 9}/map.png`}
                subtitle={purchasePrice + priceUnit}
                className="mb-5 cursor-pointer"
                onClick={handleClick(index, { x: index * 6, y: index * 9 })}
              />
            ),
          )}
        </div>
      </div>
    </div>
  );
}

export default LandmarketContainer;
