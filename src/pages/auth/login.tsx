import Link from 'next/link';
import React from 'react';

import Layout from '../../components/Layout';
import BackButton from '../../components/UI/BackButton';
import Svg from '../../components/UI/Svg';
import { isEmpty, isValidAppEmail } from '../../functions/validate';
import useForm from '../../hooks/useForm';
import { LoginState } from '../../interfaces/states';

import { AuthCtn } from '../../styles/components/auth';

const Login = () => {
  const initState: LoginState = {
    mail: '',
    password: '',
  };

  const { data, handleChange, onSubmit } = useForm(initState, validate, success);

  const { mail, password } = data;

  function validate() {
    const errors: string[] = [];

    if (isEmpty(mail, password)) {
      errors.push('Porfavor rellene correctamente todos los campos');
    }

    if (!isValidAppEmail(mail)) {
      errors.push('Ingrese un email válido pertenciente al IDDI Nueva Granada');
    }

    return errors;
  }

  function success() {
    console.log('todo bien');
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
