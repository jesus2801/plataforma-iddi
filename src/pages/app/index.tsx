import React from 'react';
import Link from 'next/link';

const index = () => {
  return (
    <div>
      <h1>hello world in app</h1>
      <Link href="/">Got to /</Link>
    </div>
  );
};

export default index;
