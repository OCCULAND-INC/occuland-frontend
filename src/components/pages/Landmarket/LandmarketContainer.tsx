import Button from '~/components/global/Button/Button';
import Card from '~/components/global/Card/Card';
import Input from '~/components/global/Input/Input';

import { mockProducts } from './items.mock';

/**
 * @TODO create out of Container component
 */

function LandmarketContainer() {
  return (
    <div className="container mx-auto max-h-screen flex flex-col p-10 overflow-scroll">
      <div>
        <Input placeholder="Platform" className="mr-5" />
        <Input placeholder="Lease" className="mr-5" />
        <Button className="mr-5">Availablity</Button>
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
