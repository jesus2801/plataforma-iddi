import React from 'react';
import Layout from '@cmpnts/Layout';
import withAuth from '@cmpnts/withAuth';

const User = () => {
  return (
    <Layout title="Perfil de usuario">
      <h1>Hello world in another user profile</h1>
    </Layout>
  );
};

export default withAuth(User);
