import { createAction, createAsyncThunk } from '@reduxjs/toolkit';

import { UPDATE_DAI_BALANCE, UPDATE_ETHBALANCE } from './constants';

interface FetchBalanceProps {
  account: string;
  daiWrapper: () => void;
}

export const updateDaiBalance =
  createAction<{ balance: string }>(UPDATE_DAI_BALANCE);
export const updateEthBalance =
  createAction<{ balance: string }>(UPDATE_ETHBALANCE);

export const fetchDaiBalance = createAsyncThunk(
  'transfer/fetchDaiBalance',
  async (payload: FetchBalanceProps) => {
    const { daiWrapper } = payload;
    const response = await daiWrapper();
    // console.log('respsonse', reponse);
    // thunkAPI.dispatch(updateDaiBalance({ balance: response }));
    return response;
  },
);
