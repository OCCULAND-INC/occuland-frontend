import { createAction } from '@reduxjs/toolkit';

import { ToastProps } from '~/components/global/Toast/Toast';

import { UPDATE_BLOCKNUMBER, UPDATE_TOAST } from './constants';

export const updateToast = createAction<Partial<ToastProps> | null>(
  UPDATE_TOAST,
);

export const updateBlockNumber = createAction<{
  blockNumber: number;
  chainId: number;
}>(UPDATE_BLOCKNUMBER);
