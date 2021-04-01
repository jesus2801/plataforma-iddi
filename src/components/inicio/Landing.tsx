import React from 'react';
import Link from 'next/link';

import { LandingCtn } from '@styles/inicio/landing';

import data from '../../data/indexPage';
import Svg from '@cmpnts/UI/Svg';

const Landing = () => {
  return (
    <LandingCtn>
      <div className="nav-ctn">
        <div className="logo">
          <span>logo</span>
          <p>App name</p>
        </div>

        <nav>
          <Link href="/">Inicio</Link>
          <Link href="/guide">Guía</Link>
        </nav>

        <Link href="auth/login">
          <button>Ingresa</button>
        </Link>
      </div>

      <div className="content">
        <div className="info">
          <h2>{data.word}</h2>

          <h1 dangerouslySetInnerHTML={{ __html: data.title }}></h1>

          <p>{data.mainText}</p>

          <Link href="auth/signup">
            <button>Registrate</button>
          </Link>
        </div>

        <div className="image">
          <Svg path="/static/images/landing.svg" />
        </div>
      </div>
    </LandingCtn>
  );
};

export default Landing;
