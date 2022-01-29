import styled from '@emotion/styled';
import { useSelector } from 'react-redux';
import ClipLoader from 'react-spinners/ClipLoader';

import { store } from '~/state/store';
import { hideOption } from '~/state/utils/actions';

interface Data {
  address: string;
  assetId: string;
  type: string;
}
function TableRow(props: { data: Data }) {
  return (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
      <td className="py-4 px-6 text-sm font-medium text-gray-500 whitespace-nowrap dark:text-white">
        {props.data.address.substring(0, 6) +
          '...' +
          props.data.address.substring(36, 42)}
      </td>
      <td className="py-4 px-6 text-sm font-medium text-gray-500 whitespace-nowrap dark:text-white">
        {props.data.address.substring(0, 6) +
          '...' +
          props.data.address.substring(36, 42)}
      </td>
      <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
        {props.data.assetId}
      </td>
      <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400 flex justify-content center align-items center">
        <ClipLoader color={'#C39BD3'} size={20} />
      </td>
    </tr>
  );
}

const TABLE_CONTAINER = styled.div`
  position: relative;
  width: 600px;
`;

export default function Table() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const data = useSelector((state: any) => state.assetCheckReducer);
  function toggleElement() {
    store.dispatch(hideOption());
  }

  return (
    <TABLE_CONTAINER>
      <div
        style={{
          backgroundColor: 'white',
          borderRadius: '100%',
          position: 'absolute',
          right: '-10px',
          top: '-10px',
        }}
        onClick={() => toggleElement()}
      >
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>
      </div>
      <div className="flex flex-col">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block py-2 min-w-full sm:px-6 lg:px-8">
            <div className="overflow-hidden shadow-md sm:rounded-lg">
              <table className="min-w-full">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th
                      scope="col"
                      className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                    >
                      From
                    </th>
                    <th
                      scope="col"
                      className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                    >
                      To
                    </th>
                    <th
                      scope="col"
                      className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                    >
                      AssetId
                    </th>
                    <th
                      scope="col"
                      className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                    >
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data?.map((element: Data, index: number) => (
                    <TableRow data={element} key={index} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </TABLE_CONTAINER>
  );
}
