import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  changeUser,
  clearUserInfo,
  getPublicUserInfo,
} from '../context/actions/user.actions';

import firebase from '../firebase';

const useAuthentication = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    const unSuscribe = firebase.auth.onAuthStateChanged(async (user) => {
      if (user) {
        dispatch(changeUser(user));
        dispatch(getPublicUserInfo(user.uid, router));
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
