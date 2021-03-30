import { User } from '../../interfaces';
import { AppActions } from '../../interfaces/context';
import { USER_CHANGE } from '../types';

const initState: User = null;

const reducer = (state = initState, action: AppActions) => {
  switch (action.type) {
    case USER_CHANGE:
      return action.payload;
    default:
      return state;
  }
};

export default reducer;
