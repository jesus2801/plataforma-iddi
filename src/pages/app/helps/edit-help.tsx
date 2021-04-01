import React from 'react';
import Layout from '@cmpnts/Layout';
import withAuth from '@cmpnts/withAuth';

const EditHelp = () => {
  return (
    <Layout title="Editar curso o repaso">
      <h1>Hello world in edit help</h1>
    </Layout>
  );
};

export default withAuth(EditHelp);
