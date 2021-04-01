import { AnyAction, Dispatch } from 'redux';
import { NextRouter } from 'next/router';
import Swal from 'sweetalert2';

import { INIT_GET_CURRENT_USER_INFO, SET_CURRENT_USER_INFO, USER_CHANGE } from '../types';

import firebase from '@firebase/index';

import { PublicUserInfo, User } from '@interfaces/index';

import { handleLoading } from '@fcns/index';

// when users credentials change
export function changeUser(user: User) {
  return (dispatch: Dispatch) => {
    dispatch(initChangeUser(user));
  };
}

const initChangeUser = (user: User): AnyAction => ({
  type: USER_CHANGE,
  payload: user,
});

// get yhe public user info from firestore
export function getPublicUserInfo(id: string, router: NextRouter) {
  return async (dispatch: Dispatch) => {
    handleLoading(true);
    dispatch(initGetUserInfo());

    try {
      const response = await firebase.db
        .collection('users')
        .where('id', '==', id)
        .limit(1)
        .get();

      response.forEach((doc) => {
        dispatch(setUserInfo(doc.data() as PublicUserInfo));
      });

      handleLoading(false);
    } catch (e) {
      handleLoading(false);
      Swal.fire({
        title: '¡Error!',
        text: 'Lo sentimos, ha ocurrido un error, porfavor regresa más tarde',
        icon: 'error',
        didClose: () => {
          router.push('/');
        },
      });
    }
  };
}

const initGetUserInfo = (): AnyAction => ({
  type: INIT_GET_CURRENT_USER_INFO,
});

const setUserInfo = (data: PublicUserInfo): AnyAction => ({
  type: SET_CURRENT_USER_INFO,
  payload: data,
});

//clear the user info
export function clearUserInfo() {
  return (dispatch: Dispatch) => {
    dispatch(clearInfo());
  };
}

const clearInfo = (): AnyAction => ({
  type: SET_CURRENT_USER_INFO,
  payload: null,
});
