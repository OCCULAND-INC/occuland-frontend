import Button from '~/components/global/Button/Button';
import Select, { SelectOption } from '~/components/global/Select/Select';

const mockOptions: Array<SelectOption> = [
  {
    value: 'eth',
    text: 'Ethereum',
  },
  {
    value: 'bsc',
    text: 'BSC',
  },
];

const mockAssets: Array<SelectOption> = [
  {
    value: '0xasd234sdf234234sdf',
    text: '0xasd234sdf234234sdf',
  },
  {
    value: '0xaaa234sdf234234sdf',
    text: '0xaaa234sdf234234sdf',
  },
  {
    value: '0xbbb234sdf234234sdf',
    text: '0xbbb234sdf234234sdf',
  },
];

function TokenBridge() {
  const handleSelectNetwork = (option: SelectOption) => {
    console.info('selected option', option);
  };

  const handleSelectAssetId = (option: SelectOption) => {
    console.info('select asset id', option);
  };

  const handleClickBridge = () => {};

  return (
    <div className="container mx-auto h-full flex flex-col justify-center items-center">
      <div className="p-6 w-96 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
        <Select
          label="From:"
          options={mockOptions}
          onChange={handleSelectNetwork}
          className="mb-5"
        />
        <Select
          label="Assets:"
          options={mockAssets}
          onChange={handleSelectAssetId}
          className="mb-5"
        />
        <div className="flex justify-center items-center">
          <label
            id="button-label"
            className="block text-sm font-medium text-gray-700 mr-5 mb-2"
          >
            To: Avalanche
          </label>
          <Button onClick={handleClickBridge}>Bridge Asset</Button>
        </div>
      </div>
    </div>
  );
}

export default TokenBridge;
