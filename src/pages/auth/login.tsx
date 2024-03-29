import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';
import Link from 'next/link';
import React from 'react';

import Layout from '@cmpnts/Layout';
import BackButton from '@cmpnts/UI/BackButton';
import Svg from '@cmpnts/UI/Svg';

import firebase from '@firebase/index';

import { isEmpty, isValidAppEmail } from '@fcns/validate';
import { handleLoading } from '@fcns/index';

import { LoginState } from '@interfaces/states';
import { AppCtx } from '@interfaces/context';

import useForm from '@hooks/useForm';

import { AuthCtn } from '@styles/auth';

import { emptyFields, invalidAppEmail, passLength } from '../../utils/errors';

const Login = () => {
  //init state of login form
  const initState: LoginState = {
    mail: '',
    password: '',
  };

  //next js router
  const router = useRouter();

  //destructuring user and rollbar
  const { personal, rollbar } = useSelector((state: AppCtx) => state.user);

  //if user exits, redirect to /app
  if (personal) router.push('/app');

  //destructuring data from useForm hook
  const { data, handleChange, onSubmit } = useForm(initState, validate, success);

  //destructuring mail an password from state of hook
  const { mail, password }: LoginState = data;

  //functions for validate form
  function validate() {
    const errors: string[] = [];

    if (isEmpty(mail, password)) {
      errors.push(emptyFields);
    }

    if (!isValidAppEmail(mail)) {
      errors.push(invalidAppEmail);
    }

    if (password.length < 6) {
      errors.push(passLength);
    }

    return errors;
  }

  //function that is fired when success validation
  async function success() {
    try {
      handleLoading(true);
      await firebase.loginUser(data);
      handleLoading(false);

      router.push('/app');
    } catch (e) {
      handleLoading(false);
      if (e.code === 'auth/wrong-password') {
        Swal.fire('¡Error!', 'Correo y/o contraseña ingresados son incorrectos', 'error');
        return;
      }

      if (e.code === 'auth/user-not-found') {
        Swal.fire('¡Error!', 'Correo y/o contraseña ingresados son incorrectos', 'error');
        return;
      }

      Swal.fire('¡Error!', e.message, 'error');
      rollbar.error(e, window.location.href);
    }
  }

  //render data
  return (
    <Layout title="Ingresar">
      <BackButton />

      <AuthCtn>
        <div className="abs">
          <Svg path="/static/abstract/auth.svg" />
          <Svg path="/static/images/auth.svg" />
        </div>

        <form className="login" onSubmit={onSubmit}>
          <Svg path="/static/icons/avatar.svg" />

          <h1>Bienvenido</h1>

          <div className="form-group">
            <label htmlFor="mail">Email:</label>
            <div className="in">
              <Svg path="/static/icons/user.svg" />
              <input
                type="text"
                placeholder="Ingresa tu email"
                id="mail"
                value={mail}
                onChange={handleChange}
              />
            </div>
            <div className="line"></div>
          </div>

          <div className="form-group">
            <label htmlFor="password">Contraseña:</label>
            <div className="in">
              <Svg path="/static/icons/password.svg" />
              <input
                type="password"
                placeholder="Ingresa tu contraseña"
                id="password"
                value={password}
                onChange={handleChange}
              />
            </div>
            <div className="line"></div>
          </div>

          <input type="submit" value="Ingresar" />

          <Link href="/auth/signup">Obtener una cuenta</Link>
        </form>
      </AuthCtn>
    </Layout>
  );
};

export default Login;
