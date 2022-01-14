import { createReducer } from '@reduxjs/toolkit';

import { fetchDaiBalance, updateEthBalance } from './actions';

interface TransferState {
  daiBalance: string;
  ethBalance: string;
}

const initState: TransferState = {
  daiBalance: '',
  ethBalance: '',
};

const reducer = createReducer(initState, (builder) =>
  builder
    .addCase(updateEthBalance, (state, action) => {
      state.ethBalance = action.payload.balance;
    })
    .addCase(fetchDaiBalance.fulfilled, () => {
      // do something
    }),
);

export default reducer;
