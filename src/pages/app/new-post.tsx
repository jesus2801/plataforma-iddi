import React from 'react';
import Layout from '@cmpnts/Layout';
import withAuth from '@cmpnts/withAuth';

const NewPost = () => {
  return (
    <Layout title="Nuevo post">
      <h1>hello world in new-post</h1>
    </Layout>
  );
};

export default withAuth(NewPost);
