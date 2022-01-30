import { HIDE_ERROR } from './constants';

const initState = {
  error: null,
  isOpen: false,
};

export default function errorReducer(state = initState, action: any) {
  const { error } = action;
  if (typeof error === 'object' && error && error.name != 'ConditionError') {
    const error_msg = error.message;
    return {
      error: error_msg,
      isOpen: true,
    };
  } else if (typeof error === 'string' && error) {
    return {
      error,
      isOpen: true,
    };
  } else if (action.type === HIDE_ERROR) {
    return {
      error: null,
      isOpen: false,
    };
  }

  return state;
}
