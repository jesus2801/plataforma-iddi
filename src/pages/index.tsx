import React from 'react';
import Layout from '@cmpnts/Layout';
import Landing from '@cmpnts/inicio/Landing';
import Technologies from '@cmpnts/inicio/Technologies';

const IndexPage = () => {
  return (
    <Layout title="Inicio">
      <Landing />
      <Technologies />
    </Layout>
  );
};

export default IndexPage;
