import { AnyAction, Dispatch } from 'redux';
import { User } from '../../interfaces';
import { USER_CHANGE } from '../types';

export function changeUser(user: User) {
  return (dispatch: Dispatch) => {
    dispatch(initChangeUser(user));
  };
}

const initChangeUser = (user: User): AnyAction => ({
  type: USER_CHANGE,
  payload: user,
});
