import Link from 'next/link';
import React from 'react';

import Layout from '../../components/Layout';
import BackButton from '../../components/UI/BackButton';
import Svg from '../../components/UI/Svg';

import { AuthCtn } from '../../styles/components/auth';

const Login = () => {
  return (
    <Layout title="Registro">
      <BackButton />

      <AuthCtn>
        <div className="abs">
          <Svg path="/static/abstract/auth.svg" />
          <Svg path="/static/images/auth.svg" />
        </div>

        <form className="login">
          <Svg path="/static/icons/avatar.svg" />

          <h1>Bienvenido</h1>

          <div className="form-group">
            <label htmlFor="mail">Nombre de usuario:</label>
            <div className="in">
              <Svg path="/static/icons/user.svg" />
              <input type="text" placeholder="Ingresa un apodo tuyo" id="mail" />
            </div>
            <div className="line"></div>
          </div>

          <div className="form-group">
            <label htmlFor="mail">Email:</label>
            <div className="in">
              <Svg path="/static/icons/user.svg" />
              <input type="text" placeholder="Ingresa tu email" id="mail" />
            </div>
            <div className="line"></div>
          </div>

          <div className="form-group">
            <label htmlFor="password">Contraseña:</label>
            <div className="in">
              <Svg path="/static/icons/password.svg" />
              <input type="password" placeholder="Ingresa tu contraseña" id="password" />
            </div>
            <div className="line"></div>
          </div>

          <div className="form-group">
            <label htmlFor="password2">Repetir contraseña:</label>
            <div className="in">
              <Svg path="/static/icons/password.svg" />
              <input type="password" placeholder="Repite tu contraseña" id="password2" />
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

export default Login;
