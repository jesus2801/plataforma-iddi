import Link from 'next/link';
import React from 'react';
import { useSelector } from 'react-redux';
import { AppCtx } from '../../interfaces/context';
import { NavProps } from '../../interfaces/props';

import { NavBar, DarkShade } from '../../styles/components/app/nav';
import ProfileImg from '../UI/ProfileImg';

const Nav = ({ state }: NavProps) => {
  const { personal, publicInfo } = useSelector((state: AppCtx) => state.user);

  return (
    <>
      <NavBar className={state ? 'active' : ''}>
        <div className="content">
          <div className="user">
            <ProfileImg size="70px" />

            <div className="info">
              <p>{personal!.displayName}</p>

              {publicInfo && (
                <p>
                  {publicInfo!.rol}
                  {publicInfo!.grade && ` - ${publicInfo!.grade}° Grado`}
                </p>
              )}

              <p>
                <span></span> En linea
              </p>
            </div>
          </div>

          <ul>
            <Link href="/app">
              <li>
                <img src="/static/icons/app/nav/home.png" alt="home icon" /> <p>Home</p>
              </li>
            </Link>

            <Link href="/app/helps">
              <li>
                <img src="/static/icons/app/nav/help.png" alt="help icon" />
                <p>Foros y refuerzos</p>
              </li>
            </Link>

            <Link href="/app/news">
              <li>
                <img src="/static/icons/app/nav/news.png" alt="news icon" />
                <p>Noticias y campañas</p>
              </li>
            </Link>

            <Link href="/app/reviews">
              <li>
                <img src="/static/icons/app/nav/courses.png" alt="news icon" />
                <p>Guías y cursos</p>
              </li>
            </Link>
          </ul>
        </div>

        <p className="by">
          Desarrollado por{' '}
          <a href="https://portfolio-5227d.web.app/" target="_blank">
            Jesús García
          </a>
        </p>
      </NavBar>
      <DarkShade className={state ? 'active' : ''}></DarkShade>
    </>
  );
};

export default Nav;
