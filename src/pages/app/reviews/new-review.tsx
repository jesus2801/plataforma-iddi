import React from 'react';
import Layout from '@cmpnts/Layout';
import withAuth from '@cmpnts/withAuth';

const NewReview = () => {
  return (
    <Layout title="Nueva discución o refuerzo">
      <h1>hello world in a new forum</h1>
    </Layout>
  );
};

export default withAuth(NewReview);
