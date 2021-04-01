import React from 'react';
import Layout from '@cmpnts/Layout';
import withAuth from '@cmpnts/withAuth';

const EditNew = () => {
  return (
    <Layout title="Editar noticia o campaña">
      <h1>hello world in EditNew </h1>
    </Layout>
  );
};

export default withAuth(EditNew);
