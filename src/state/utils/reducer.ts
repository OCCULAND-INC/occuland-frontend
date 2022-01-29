import { HIDE_OPTION, OPEN_OPTION } from './constants';

const initState = {
  isOpen: false,
};

export default function toggleElementsReducer(state = initState, action: any) {
  // eslint-disable-next-line no-console
  if (action.type == HIDE_OPTION) {
    return {
      isOpen: true,
    };
  } else if (action.type == OPEN_OPTION) {
    return {
      isOpen: false,
    };
  }

  return state;
}
