import styled from '@emotion/styled';
import { useDispatch, useSelector } from 'react-redux';

interface Data {
  address: string;
  assetId: string;
}
function TableRow(props: { data: Data }) {
  return (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
      <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
        {props.data.address}
      </td>
      <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
        {props.data.assetId}
      </td>
      <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
        Laptop
      </td>
      <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
        $2999
      </td>
      <td className="py-4 px-6 text-sm font-medium text-right whitespace-nowrap">
        <a
          href="#"
          className="text-blue-600 hover:text-blue-900 dark:text-blue-500 dark:hover:underline"
        >
          Edit
        </a>
      </td>
    </tr>
  );
}

const TABLE_CONTAINER = styled.div`
  width: 500px;
  border: solid red 1px;
  background-color: red;
`;

export default function Table() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const data = useSelector((state: any) => state.assetCheckReducer);
  // eslint-disable-next-line no-console
  console.log(data);
  const dispatch = useDispatch();
  return (
    <TABLE_CONTAINER>
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
                      Address
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
                    <th scope="col" className="relative py-3 px-6">
                      <span className="sr-only">Edit</span>
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
