import { useSelector } from 'react-redux';
import React from 'react';

import { AppCtx } from '@interfaces/context';

import Login from '../pages/auth/login';

const withAuth = (Component: any) => {
  const Auth = (props: any) => {
    const user = useSelector((state: AppCtx) => state.user.personal);

    return user ? <Component {...props} /> : <Login />;
  };
  return Auth;
};

export default withAuth;
