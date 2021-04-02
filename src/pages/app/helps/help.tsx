import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import firebase from '@firebase/index';

import Layout from '@cmpnts/Layout';
import withAuth from '@cmpnts/withAuth';

import { HelpForum } from '@interfaces/index';

const Help = () => {
  //component page states
  const [forum, setForum] = useState(null as null | HelpForum);

  const router = useRouter();

  const {
    query: { id },
  } = router;

  useEffect(() => {
    if (id) {
      const main = async () => {
        const snapShot = await firebase.db
          .collection('forums')
          .doc(id as string)
          .get();

        if (!snapShot.exists) {
          router.push('/');
        }
        setForum(snapShot.data() as HelpForum);
      };
      main();
    }
  }, []);

  return (
    <Layout title="Curso o repaso">
      <h1>hello world in forum</h1>
    </Layout>
  );
};

export default withAuth(Help);
