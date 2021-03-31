import React from 'react';
import styled from '@emotion/styled';

const SelectSprite = () => {
  const Sprites = styled.svg`
    position: absolute;
    width: 0;
    height: 0;
    pointer-events: none;
    user-select: none;
  `;

  return (
    <Sprites>
      <symbol id="select-arrow-down" viewBox="0 0 10 6">
        <polyline points="1 1 5 5 9 1"></polyline>
      </symbol>
    </Sprites>
  );
};

export default SelectSprite;
