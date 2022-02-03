import { createReducer } from '@reduxjs/toolkit';

import { ToastProps } from '~/components/global/Toast/Toast';

import { updateBlockNumber, updateToast } from './actions';

export interface ApplicationState {
  readonly blockNumber: { readonly [chainId: number]: number };
  readonly toast: Partial<ToastProps> | null;
}

const initialState: ApplicationState = {
  blockNumber: {},
  toast: {
    text: 'testing',
  },
};

export default createReducer(initialState, (builder) =>
  builder
    .addCase(updateToast, (state, action) => {
      state.toast = action.payload;
    })
    .addCase(updateBlockNumber, (state, action) => {
      const { chainId, blockNumber } = action.payload;
      if (typeof state.blockNumber[chainId] !== 'number') {
        state.blockNumber[chainId] = blockNumber;
      } else {
        state.blockNumber[chainId] = Math.max(
          blockNumber,
          state.blockNumber[chainId],
        );
      }
    }),
);
