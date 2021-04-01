import React from 'react';
import Layout from '@cmpnts/Layout';
import withAuth from '@cmpnts/withAuth';

const EditReview = () => {
  return (
    <Layout title="Editar discución o repaso">
      <h1>hello world in edit review</h1>
    </Layout>
  );
};

export default withAuth(EditReview);
