import { useState } from 'react';

import Button from '~/components/global/Button/Button';
import Card from '~/components/global/Card/Card';
import Select from '~/components/global/Select/Select';

import { mockProducts } from './items.mock';

/**
 * @TODO create out of Container component
 */

function LandmarketContainer() {
  const [platformSelection, setPlatformSelection] = useState<string>('0');
  const [leaseType, setLeaseType] = useState<string>('0');

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
        <div className="gap-8 columns-3">
          {mockProducts.map(
            ({ imageUrl, price, priceUnit, purchasePrice, title }, index) => (
              <Card
                key={title + index}
                title={price + priceUnit}
                imageUrl={imageUrl}
                subtitle={purchasePrice + priceUnit}
                className="mb-5"
              />
            ),
          )}
        </div>
      </div>
    </div>
  );
}

export default LandmarketContainer;
