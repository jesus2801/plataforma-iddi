import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { changeUser } from '../context/actions/user.actions';

import firebase from '../firebase';
import { User } from '../interfaces';

const useAuthentication = () => {
  const [userAuthenticate, setUserAuthenticate] = useState(null as User);
  const dispatch = useDispatch();

  useEffect(() => {
    const unSuscribe = firebase.auth.onAuthStateChanged(async (user) => {
      if (user) {
        dispatch(changeUser(user));
        setUserAuthenticate(user);
        return;
      } else {
        dispatch(changeUser(null));
        setUserAuthenticate(null);
        return;
      }
    });
    return () => unSuscribe();
  }, []);

  return userAuthenticate;
};

export default useAuthentication;
