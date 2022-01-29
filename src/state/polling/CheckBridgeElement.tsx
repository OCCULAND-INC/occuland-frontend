/* eslint-disable react/function-component-definition */
import { useGetPokemonByIdQuery } from '~/state/polling/reducer';

export const CheckBridgeElement = (address: string, assetId: string) => {
  const pollInterval = 60000;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data, error, isLoading, isFetching, refetch } =
    useGetPokemonByIdQuery('1', {
      pollingInterval: pollInterval,
    });

  // eslint-disable-next-line no-console

  return (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
      <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
        {address}
      </td>
      <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
        {assetId}
      </td>
      <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
        Laptop
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
};
