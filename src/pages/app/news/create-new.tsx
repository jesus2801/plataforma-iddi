import React from 'react';
import Layout from '@cmpnts/Layout';
import withAuth from '@cmpnts/withAuth';

const CreateNew = () => {
  return (
    <Layout title="Crear noticia o campaña">
      <h1>hello world in CreateNew </h1>
    </Layout>
  );
};

export default withAuth(CreateNew);
