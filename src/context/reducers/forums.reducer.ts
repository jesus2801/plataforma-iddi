import { AppActions, ForumsCtx } from '@interfaces/context';
import { INIT_SET_FORUMS, SET_FORUMS } from 'context/types';

const initState: ForumsCtx = {
  forums: [],
  selectedForum: null,
  isLoading: true,
};

const reducer = (state = initState, action: AppActions): ForumsCtx => {
  switch (action.type) {
    case INIT_SET_FORUMS:
      return {
        ...state,
        isLoading: true,
      };

    case SET_FORUMS:
      return {
        ...state,
        isLoading: false,
        forums: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;
