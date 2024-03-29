import { NextPage } from 'next';
import Layout from './Layout';
import React from 'react';

import { AppLayoutProps } from '@interfaces/props';
import Header from './app/Header';

const AppLayout: NextPage<AppLayoutProps> = ({ title, children }) => {
  return (
    <Layout title={title}>
      <Header />
      {children}
    </Layout>
  );
};

export default AppLayout;
