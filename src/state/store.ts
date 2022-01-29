import { configureStore } from '@reduxjs/toolkit';

import bridge from './bridge/reducer';
import errorReducer from './error/reducer';
import assetCheckReducer, { pokemonApi } from './polling/reducer';

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const store = configureStore({
  reducer: {
    bridge,
    errorReducer,
    assetCheckReducer,
    [pokemonApi.reducerPath]: pokemonApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(pokemonApi.middleware),
});
