import { useEffect, useState } from 'react';
import { ClipLoader } from 'react-spinners';

/* eslint-disable react/function-component-definition */
import { useGetStatusQuery } from '~/state/polling/reducer';

export default function CheckBridgeElement(props: {
  address: string;
  assetId: string;
  hash: string;
  type: string;
}) {
  const [pollInterval, setPollInterval] = useState(60000);
  const [status, setStatus] = useState('pending');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data, error, isLoading, isFetching, refetch } = useGetStatusQuery(
    [props.address, props.assetId, props.hash],
    {
      pollingInterval: pollInterval,
    },
  );
  useEffect(() => {
    if (data == 'confirmed') {
      setPollInterval(0);
      setStatus('confirmed');
    }
  }, [data]);

  return (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
      <td className="py-4 px-6 text-sm font-medium text-gray-500 whitespace-nowrap dark:text-white">
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
          }}
        >
          <img
            style={{
              height: '20px',
              width: '16px',
              marginRight: '5px',
            }}
            src={
              props.type == 'out'
                ? 'https://www.pngall.com/wp-content/uploads/10/Ethereum-Logo-PNG-Image-HD.png'
                : 'https://www.pngall.com/wp-content/uploads/10/Avalanche-Crypto-Logo-PNG-Pic.png'
            }
          />
          {props.address.substring(0, 6) +
            '...' +
            props.address.substring(36, 42)}
        </div>
      </td>
      <td className="py-4 px-6 text-sm font-medium text-gray-500 whitespace-nowrap dark:text-white">
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
          }}
        >
          <img
            style={{
              height: '20px',
              width: '16px',
              marginRight: '5px',
            }}
            src={
              props.type == 'out'
                ? 'https://www.pngall.com/wp-content/uploads/10/Avalanche-Crypto-Logo-PNG-Pic.png'
                : 'https://www.pngall.com/wp-content/uploads/10/Ethereum-Logo-PNG-Image-HD.png'
            }
          />
          {props.address.substring(0, 6) +
            '...' +
            props.address.substring(36, 42)}
        </div>
      </td>
      <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
        {props.assetId}
      </td>
      <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400 flex justify-content center align-items center">
        {status == 'pending' ? (
          <ClipLoader color={'#C39BD3'} size={20} />
        ) : (
          'Confirmed'
        )}
      </td>
    </tr>
  );
}
