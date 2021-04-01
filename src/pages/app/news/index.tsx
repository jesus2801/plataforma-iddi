import React from 'react';
import AppLayout from '@cmpnts/AppLayout';
import withAuth from '@cmpnts/withAuth';

const News = () => {
  return (
    <AppLayout title="Noticias y campañas">
      <h1>hello world in news </h1>
    </AppLayout>
  );
};

export default withAuth(News);
