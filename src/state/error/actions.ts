import { HIDE_ERROR, SET_ERROR } from './constants';
export function setError(error: string) {
  return {
    type: SET_ERROR,
    error,
  };
}

export function hideError() {
  return {
    type: HIDE_ERROR,
  };
}
