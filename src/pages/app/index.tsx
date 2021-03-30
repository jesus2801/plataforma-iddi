import React from 'react';
import Link from 'next/link';
import Layout from '../../components/Layout';

const index = () => {
  return (
    <Layout title="Home">
      <h1>hello world in app</h1>
      <Link href="/">Got to /</Link>
    </Layout>
  );
};

export default index;
