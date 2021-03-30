import Link from 'next/link';
import React from 'react';
import { BackBtn } from '../../styles/components/UI';

const BackButton = () => {
  return (
    <Link href="/">
      <BackBtn>Volver</BackBtn>
    </Link>
  );
};

export default BackButton;
