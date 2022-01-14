import { configureStore } from '@reduxjs/toolkit';

import transfer from './bridge/reducer';

export const store = configureStore({
  reducer: {
    transfer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
