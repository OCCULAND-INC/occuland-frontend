import { Web3Provider } from '@ethersproject/providers';
import { useWeb3React } from '@web3-react/core';
import { useCallback, useEffect, useState } from 'react';

import { useAppDispatch } from '~/hooks/redux-hook';
import useDebounce from '~/hooks/useDebounce';
import { updateBlockNumber } from '~/state/app/actions';

function useBlockNumber() {
  const dispatch = useAppDispatch();
  const { library, chainId } = useWeb3React<Web3Provider>();
  const [state, setState] = useState<{
    blockNumber: number | null;
    chainId: number | undefined;
  }>({
    chainId,
    blockNumber: null,
  });

  const blockNumberUpdateCallback = useCallback(
    (blockNumber: number) => {
      setState((state) => {
        if (chainId === state.chainId) {
          if (typeof state.blockNumber !== 'number') {
            return { chainId, blockNumber };
          }
          return {
            chainId,
            blockNumber: Math.max(blockNumber, state.blockNumber),
          };
        }
        return state;
      });
    },
    [chainId],
  );

  useEffect(() => {
    if (!library || !chainId) {
      return undefined;
    }

    setState({ chainId, blockNumber: null });

    library
      .getBlockNumber()
      .then(blockNumberUpdateCallback)
      .catch((error) =>
        console.error(
          `Failed to get block number for chainId: ${chainId}`,
          error,
        ),
      );

    library.on('block', blockNumberUpdateCallback);
    return () => {
      library.removeListener('block', blockNumberUpdateCallback);
    };
  }, [dispatch, chainId, library, blockNumberUpdateCallback]);

  const debouncedState = useDebounce(state, 100);

  useEffect(() => {
    if (!debouncedState.chainId || !debouncedState.blockNumber) {
      return;
    }

    dispatch(
      updateBlockNumber({
        chainId: debouncedState.chainId,
        blockNumber: debouncedState.blockNumber,
      }),
    );
  }, [dispatch, debouncedState.blockNumber, debouncedState.chainId]);

  return [debouncedState.blockNumber];
}

export default useBlockNumber;
