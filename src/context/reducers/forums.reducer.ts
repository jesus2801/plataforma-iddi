import { AppActions, ForumsCtx } from '@interfaces/context';
import {
  INIT_GET_SELECTED_FORUM,
  INIT_SET_FORUMS,
  SET_FORUMS,
  SET_SELECTED_FORUM,
  SET_SELECTED_FORUM_REF,
} from 'context/types';

const initState: ForumsCtx = {
  forums: [],
  selectedForum: null,
  isLoading: true,
  selectedForumRef: null,
};

const reducer = (state = initState, action: AppActions): ForumsCtx => {
  switch (action.type) {
    case INIT_SET_FORUMS:
      return {
        ...state,
        isLoading: true,
      };

    case INIT_GET_SELECTED_FORUM:
      return {
        ...state,
        selectedForum: null,
        selectedForumRef: null,
      };

    case SET_SELECTED_FORUM:
      return {
        ...state,
        selectedForum: action.payload,
      };

    case SET_SELECTED_FORUM_REF:
      return {
        ...state,
        selectedForumRef: action.payload,
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
