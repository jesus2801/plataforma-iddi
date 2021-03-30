import { NextPage } from 'next';
import React from 'react';

import { SvgProps } from '../../interfaces/props';
import { objectError } from '../../utils/variables';

const Svg: NextPage<SvgProps> = ({ path }) => {
  return (
    <object type="image/svg+xml" data={path}>
      {objectError}
    </object>
  );
};

export default Svg;
