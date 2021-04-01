import React from 'react';
import Layout from '@cmpnts/Layout';
import withAuth from '@cmpnts/withAuth';

const Config = () => {
  return (
    <Layout title="Configuración">
      <h1>hello world in config</h1>
    </Layout>
  );
};

export default withAuth(Config);
