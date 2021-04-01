import React from 'react';
import AppLayout from '@cmpnts/AppLayout';
import withAuth from '@cmpnts/withAuth';

const Reviews = () => {
  return (
    <AppLayout title="Ayudas y refuerzos">
      <h1>Hello world in FORUMS for reviews</h1>
    </AppLayout>
  );
};

export default withAuth(Reviews);
