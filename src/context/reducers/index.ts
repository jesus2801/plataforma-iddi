import DatabaseReducer from './user.reducer';
import ForumsReducer from './forums.reducer';
import { combineReducers } from 'redux';

export default combineReducers({
  user: DatabaseReducer,
  forums: ForumsReducer,
});
