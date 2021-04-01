import { useRouter } from 'next/router';
import Link from 'next/link';
import React from 'react';

import Layout from '@cmpnts/Layout';
import BackButton from '@cmpnts/UI/BackButton';
import Svg from '@cmpnts/UI/Svg';

import { isEmpty, isValidAppEmail } from '@fcns/validate';

import useForm from '@hooks/useForm';

import { SignupState } from '@interfaces/states';

import firebase from '@firebase/index';

import { AuthCtn } from '@styles/auth';

import { emptyFields, invalidAppEmail, passLength } from '../../utils/errors';

const Signup = () => {
  const initState: SignupState = {
    userName: '',
    mail: '',
    password: '',
    password2: '',
  };

  const router = useRouter();

  const { data, handleChange, onSubmit } = useForm(initState, validate, success);

  const { userName, mail, password, password2 }: SignupState = data;

  function validate() {
    const errors: string[] = [];

    if (isEmpty(userName, mail, password, password2)) {
      errors.push(emptyFields);
    }

    if (!isValidAppEmail(mail)) {
      errors.push(invalidAppEmail);
    }

    if (password !== password2) {
      errors.push('Las dos contraseñas ingresadas no coinciden');
    }

    if (password.length < 6) {
      errors.push(passLength);
    }

    return errors;
  }

  async function success() {
    await firebase.registerUser(data, router);
  }

  return (
    <Layout title="Registro">
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
            <label htmlFor="userName">Nombre de usuario:</label>
            <div className="in">
              <Svg path="/static/icons/user.svg" />
              <input
                type="text"
                placeholder="Ingresa un apodo tuyo"
                id="userName"
                value={userName}
                onChange={handleChange}
              />
            </div>
            <div className="line"></div>
          </div>

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

          <div className="form-group">
            <label htmlFor="password2">Repetir contraseña:</label>
            <div className="in">
              <Svg path="/static/icons/password.svg" />
              <input
                type="password"
                placeholder="Repite tu contraseña"
                id="password2"
                value={password2}
                onChange={handleChange}
              />
            </div>
            <div className="line"></div>
          </div>

          <input type="submit" value="Registrame" />

          <Link href="/auth/login">¿Ya tienes cuenta?</Link>
        </form>
      </AuthCtn>
    </Layout>
  );
};

export default Signup;
