import React from 'react';
import Layout from '@cmpnts/Layout';
import withAuth from '@cmpnts/withAuth';

const New = () => {
  return (
    <Layout title="Noticia o campaña">
      <h1>hello world in New </h1>
    </Layout>
  );
};

export default withAuth(New);
