import { createReducer } from '@reduxjs/toolkit';

import { ToastProps } from '~/components/global/Toast/Toast';

import { addToast, updateBlockNumber } from './actions';

export interface ApplicationState {
  readonly blockNumber: { readonly [chainId: number]: number };
  readonly toasts: Array<Partial<ToastProps>> | null;
}

const initialState: ApplicationState = {
  blockNumber: {},
  toasts: [
    {
      text: 'testing1',
    },
    {
      text: 'testing2',
    },
  ],
};

export default createReducer(initialState, (builder) =>
  builder
    .addCase(addToast, (state, action) => {
      if (!state.toasts) {
        state.toasts = [];
      }
      state.toasts?.push(action.payload);
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
