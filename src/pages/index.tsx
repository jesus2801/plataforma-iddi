import React from 'react';
import Layout from '../components/Layout';
import Landing from '../components/inicio/Landing';
import Technologies from '../components/inicio/Technologies';

const IndexPage = () => {
  return (
    <Layout title="Inicio">
      <Landing />
      <Technologies />
    </Layout>
  );
};

export default IndexPage;
