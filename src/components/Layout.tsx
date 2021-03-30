import { NextPage } from 'next';
import React, { useEffect, useState } from 'react';
import Helmet from 'react-helmet';

import { LayoutProps } from '../interfaces/props';

import data from '../data/Layout';
import useAuthentication from '../hooks/useAuthentication';
import { useDispatch } from 'react-redux';
import { changeUser } from '../context/actions/user.actions';
import { User } from '../interfaces';

const Layout: NextPage<LayoutProps> = ({ title, children }) => {
  title = `App name | ${title}`;

  const [actualUrl, setActualUrl] = useState('');

  useEffect(() => {
    setActualUrl(window.location.href);
  }, []);

  useAuthentication();

  //TODO: poner og:image y twitter:image

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="title" content={title} />

        <link rel="canonical" href={process.env.DOMAIN!} />
        <link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />

        <meta http-equiv="Content-Language" content="es" />
        <meta httpEquiv="content-type" content="text/html" charSet="UTF-8" />
        <meta httpEquiv="cache-control" content="public, max-age=3024000" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1, minimum-scale=1"
        />

        <meta name="description" content={data.desc} />
        <meta name="abstract" content={data.desc} />
        <meta name="keywords" content={data.keywords} />
        <meta name="author" content="Jesús García" />
        <meta name="copyright" content="Jesús García" />
        <meta name="DC.Language" content="Spanish" />
        <meta name="Resource-type" content="Document" />
        <meta name="robots" content="ALL" />
        <meta name="distribution" content="global" />

        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:locale" content="es_ES" />
        <meta property="og:description" content={data.desc} />
        <meta property="og:url" content={actualUrl} />

        <meta name="twitter:card" content="summary" />
        <meta name="twitter:url" content={actualUrl} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={data.desc} />

        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600&family=Nunito:ital,wght@0,300;1,300&display=swap"
          rel="stylesheet"
        />
      </Helmet>
      {children}
    </>
  );
};

export default Layout;
