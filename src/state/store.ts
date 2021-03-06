import { configureStore } from '@reduxjs/toolkit';

import bridge from './bridge/reducer';
import errorReducer from './error/reducer';
import assetCheckReducer, { statusApi } from './polling/reducer';
import toggleElementsReducer from './utils/reducer';

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const store = configureStore({
  reducer: {
    assetCheckReducer,
    bridge,
    errorReducer,
    toggleElementsReducer,
    [statusApi.reducerPath]: statusApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(statusApi.middleware),
});
