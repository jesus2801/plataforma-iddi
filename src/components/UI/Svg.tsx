import { NextPage } from 'next';
import React from 'react';

import { objectError } from '../../utils/variables';
import { SvgProps } from '@interfaces/props';

const Svg: NextPage<SvgProps> = ({ path }) => {
  return (
    <object type="image/svg+xml" data={path}>
      {objectError}
    </object>
  );
};

export default Svg;
