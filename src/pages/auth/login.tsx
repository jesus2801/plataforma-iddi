import Link from 'next/link';
import React from 'react';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';

import Layout from '../../components/Layout';
import BackButton from '../../components/UI/BackButton';
import Svg from '../../components/UI/Svg';

import firebase from '../../firebase';
import { isEmpty, isValidAppEmail } from '../../functions/validate';
import { emptyFields, invalidAppEmail, passLength } from '../../utils/errors';
import { handleLoading } from '../../functions';

import useForm from '../../hooks/useForm';
import { LoginState } from '../../interfaces/states';

import { AuthCtn } from '../../styles/components/auth';
import { useSelector } from 'react-redux';
import { AppCtx } from '../../interfaces/context';

const Login = () => {
  const initState: LoginState = {
    mail: '',
    password: '',
  };

  const router = useRouter();

  const user = useSelector((state: AppCtx) => state.user);

  if (user) router.push('/app');

  const { data, handleChange, onSubmit } = useForm(initState, validate, success);

  const { mail, password }: LoginState = data;

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
    }
  }

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
