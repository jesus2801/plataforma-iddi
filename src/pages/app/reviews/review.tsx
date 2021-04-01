import React from 'react';
import Layout from '@cmpnts/Layout';
import withAuth from '@cmpnts/withAuth';

const Review = () => {
  return (
    <Layout title="Discución de refuerzo">
      <h1>Hello world in a one forum or review</h1>
    </Layout>
  );
};

export default withAuth(Review);
