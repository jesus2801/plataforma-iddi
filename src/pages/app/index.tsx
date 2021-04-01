import React from 'react';

import AppLayout from '@cmpnts/AppLayout';

import withAuth from '@cmpnts/withAuth';

const index = () => {
  return (
    <AppLayout title="Home">
      <h1>hello world</h1>
    </AppLayout>
  );
};

export default withAuth(index);
