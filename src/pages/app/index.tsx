import React from 'react';

import AppLayout from '../../components/AppLayout';

import withAuth from '../../components/withAuth';

const index = () => {
  return (
    <AppLayout title="Home">
      <h1>hello world</h1>
    </AppLayout>
  );
};

export default withAuth(index);
