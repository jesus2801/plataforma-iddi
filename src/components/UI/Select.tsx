import React from 'react';

import styled from '@emotion/styled';
import { SelectProps } from '../../interfaces/props';

const Select = ({ children, minWidth, ...rest }: SelectProps) => {
  const SelectCtn = styled.label`
    position: relative;
    min-width: ${minWidth};
    z-index: 0;

    &:first-of-type {
      margin-right: 15px;
    }

    svg {
      position: absolute;
      right: 12px;
      top: calc(50% - 3px);
      width: 10px;
      height: 6px;
      stroke-width: 2px;
      stroke: #9098a9;
      fill: none;
      stroke-linecap: round;
      stroke-linejoin: round;
      pointer-events: none;
    }

    select {
      -webkit-appearance: none;
      padding: 7px 40px 7px 12px;
      width: 100%;
      border: 1px solid #e8eaed;
      border-radius: 5px;
      background: #fff;
      box-shadow: 0 1px 3px -2px #9098a9;
      cursor: pointer;
      font-family: inherit;
      font-size: 16px;
      transition: all 150ms ease;

      color: #5a667f;

      &:focus {
        outline: none;
        border-color: #07f;
        box-shadow: 0 0 0 2px rgba(0, 119, 255, 0.2);
      }

      &:hover + svg {
        stroke: #07f;
      }

      option {
        color: #223254;
      }
    }
  `;

  return (
    <SelectCtn htmlFor="slct">
      <select id="slct" required={true} {...rest}>
        {children}
      </select>

      <svg>
        <use xlinkHref="#select-arrow-down"></use>
      </svg>
    </SelectCtn>
  );
};

export default Select;
