import React from 'react';
import {
  Technologie,
  TechnologiesCtn,
} from '../../styles/components/inicio/thecnologies';
import Svg from '../UI/Svg';

const Technologies = () => {
  return (
    <TechnologiesCtn>
      <Technologie>
        <Svg path="/static/icons/next-js.svg" />
        <h3>NextJS</h3>
      </Technologie>

      <Technologie>
        <Svg path="/static/icons/firebase.svg" />
        <h3>Firebase</h3>
      </Technologie>

      <Technologie>
        <Svg path="/static/icons/typescript.svg" />
        <h3>Typescript</h3>
      </Technologie>

      <Technologie>
        <Svg path="/static/icons/redux.svg" />
        <h3>Redux</h3>
      </Technologie>

      <Technologie>
        <Svg path="/static/icons/sass.svg" />
        <h3>Sass</h3>
      </Technologie>
    </TechnologiesCtn>
  );
};

export default Technologies;
