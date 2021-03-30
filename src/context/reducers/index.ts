import DatabaseReducer from './user.reducer';
import { combineReducers } from 'redux';

export default combineReducers({
  user: DatabaseReducer,
});
