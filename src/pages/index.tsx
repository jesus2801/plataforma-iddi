import React from 'react';
import Link from 'next/link';
import Layout from '../components/Layout';

const IndexPage = () => {
  return (
    <Layout title="app">
      <h1>hola mundo</h1>
      <Link href="/app">App</Link>
    </Layout>
  );
};

export default IndexPage;
