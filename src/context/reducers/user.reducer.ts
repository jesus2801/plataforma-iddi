import { INIT_GET_CURRENT_USER_INFO, SET_CURRENT_USER_INFO, USER_CHANGE } from '../types';
import { AppActions, UserCtx } from '@interfaces/context';

import Rollbar from 'rollbar';

const initState: UserCtx = {
  personal: null,
  publicInfo: null,
  rollbar: new Rollbar({
    accessToken: '2c05ad59e8154fb8840c9047fa955fd6',
    captureUncaught: true,
    captureUnhandledRejections: true,
    enabled: false,
    environment: 'dev',
  }),
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
