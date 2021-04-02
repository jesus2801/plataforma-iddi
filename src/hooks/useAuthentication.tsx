import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import {
  changeUser,
  clearUserInfo,
  getPublicUserInfo,
} from '../context/actions/user.actions';

import firebase from '../firebase';
import { AppCtx } from '@interfaces/context';

const useAuthentication = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const rollbar = useSelector((state: AppCtx) => state.user.rollbar);

  useEffect(() => {
    const unSuscribe = firebase.auth.onAuthStateChanged(async (user) => {
      if (user) {
        dispatch(changeUser(user));
        dispatch(getPublicUserInfo(user.uid, router, rollbar));
        return;
      } else {
        dispatch(changeUser(null));
        dispatch(clearUserInfo());
        return;
      }
    });
    return () => unSuscribe();
  }, []);

  return;
};

export default useAuthentication;
