import { createAction } from '@reduxjs/toolkit';

import { ToastProps } from '~/components/global/Toast/Toast';

import { ADD_TOAST, REMOVE_TOAST, UPDATE_BLOCKNUMBER } from './constants';

export const addToast = createAction<Partial<ToastProps>>(ADD_TOAST);
export const removeToast = createAction<{ id: string }>(REMOVE_TOAST);

export const updateBlockNumber = createAction<{
  blockNumber: number;
  chainId: number;
}>(UPDATE_BLOCKNUMBER);
