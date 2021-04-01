import React, { MouseEvent } from 'react';
import { useSelector } from 'react-redux';

import { AppCtx } from '../../interfaces/context';

import { ConfigButtonCtn } from '@styles/app/header';

import ProfileImg from './ProfileImg';

import firebase from '@firebase/index';

const ConfigButton = () => {
  const handleActive = (e: MouseEvent<HTMLImageElement>) => {
    e.currentTarget.classList.toggle('active');
  };

  const user = useSelector((state: AppCtx) => state.user.personal);

  return (
    <ConfigButtonCtn>
      <img
        src="/static/icons/app/config.png"
        id="config"
        onClick={handleActive}
        alt="config icon"
      />

      <ul>
        <li>
          <ProfileImg size="70px" />
          <div className="info">
            {user && (
              <>
                <p>{user!.displayName}</p>
                <p>{user!.email}</p>
              </>
            )}
          </div>
        </li>
        <li className="option">Perfil</li>
        <li className="option">Ajustes</li>
        <li className="option" onClick={() => firebase.auth.signOut()}>
          Cerrar sesión
        </li>
      </ul>
    </ConfigButtonCtn>
  );
};

export default ConfigButton;
