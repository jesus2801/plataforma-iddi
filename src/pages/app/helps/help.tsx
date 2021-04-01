import React from 'react';
import Layout from '@cmpnts/Layout';
import withAuth from '@cmpnts/withAuth';

const Help = () => {
  return (
    <Layout title="Curso o repaso">
      <h1>hello world in a one help</h1>
    </Layout>
  );
};

export default withAuth(Help);
