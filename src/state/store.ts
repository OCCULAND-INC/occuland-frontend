import { configureStore } from '@reduxjs/toolkit';

import bridge from './bridge/reducer';

export const store = configureStore({
  reducer: { bridge },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;