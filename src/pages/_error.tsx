import React from 'react';
import Router from 'next/router';

import { ErrorProps, StatusCode } from '@interfaces/index';

function Error({ statusCode }: StatusCode) {
  return (
    <p>
      {statusCode
        ? `An error ${statusCode} occurred on server`
        : 'An error occurred on client'}
    </p>
  );
}

Error.getInitialProps = ({ res, req, err }: ErrorProps) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;

  if (statusCode === 404) {
    const url = req.url!;
    if (url.match(/\/$/)) {
      const withoutTrailingSlash = url.substr(0, url.length - 1);
      if (res) {
        res.writeHead(303, {
          Location: withoutTrailingSlash,
        });
        res.end();
      } else {
        Router.push(withoutTrailingSlash);
      }
    }
  }

  return { statusCode };
};

export default Error;
