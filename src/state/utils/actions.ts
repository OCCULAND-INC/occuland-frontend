import { HIDE_OPTION, OPEN_OPTION } from './constants';
export function openOption() {
  return {
    type: OPEN_OPTION,
  };
}

export function hideOption() {
  return {
    type: HIDE_OPTION,
  };
}
