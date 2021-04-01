import styled from '@emotion/styled';
import React from 'react';

import { SearchProps } from '@interfaces/props';
import Svg from './Svg';

const Search = ({ placeholder, width }: SearchProps) => {
  const SearchCtn = styled.div`
    width: ${width};
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    border: 1px solid #dddddd;
    padding: 6px 15px;
    border-radius: 100px;
    transition: border 300ms ease;

    &:focus-within {
      border: 1px solid var(--blue);
    }

    input {
      width: 100%;
      border: none;
      border-radius: 100px;
      outline: none;

      color: var(--black);
    }

    object {
      width: 20px;
    }
  `;

  return (
    <SearchCtn>
      <input type="text" placeholder={placeholder} />
      <Svg path="/static/icons/app/search.svg" />
    </SearchCtn>
  );
};

export default Search;
