import React from 'react';
import Layout from '@cmpnts/Layout';
import withAuth from '@cmpnts/withAuth';

const EditPost = () => {
  return (
    <Layout title="Editar post">
      <h1>Hello World in edit post</h1>
    </Layout>
  );
};

export default withAuth(EditPost);
