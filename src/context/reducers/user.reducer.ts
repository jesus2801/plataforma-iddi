import { AppActions, UserCtx } from '../../interfaces/context';
import { INIT_GET_CURRENT_USER_INFO, SET_CURRENT_USER_INFO, USER_CHANGE } from '../types';

const initState: UserCtx = {
  personal: null,
  publicInfo: null,
};

const reducer = (state = initState, action: AppActions): UserCtx => {
  switch (action.type) {
    case USER_CHANGE:
      return {
        ...state,
        personal: action.payload,
      };

    case SET_CURRENT_USER_INFO:
      return {
        ...state,
        publicInfo: action.payload,
      };

    case INIT_GET_CURRENT_USER_INFO:
    default:
      return state;
  }
};

export default reducer;
