import React from 'react';
import Link from 'next/link';

import Layout from '../../components/Layout';

import firebase from '../../firebase';

import withAuth from '../../components/withAuth';

const index = () => {
  return (
    <Layout title="Home">
      <h1>hello world in app</h1>
      <Link href="/">Got to /</Link>
      <button
        onClick={() => {
          firebase.auth.signOut();
        }}
      ></button>
    </Layout>
  );
};

export default withAuth(index);
