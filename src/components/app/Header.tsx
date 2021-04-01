import React, { useState } from 'react';

import { HeaderCtn, MenuIcon } from '@styles/app/header';
import ConfigButton from '@cmpnts/UI/ConfigButton';
import ProfileImg from '@cmpnts/UI/ProfileImg';

import Notifications from '@cmpnts/UI/Notifications';
import Nav from './Nav';

const Header = () => {
  const [navState, setNavState] = useState(false);

  return (
    <>
      <Nav state={navState} />
      <MenuIcon
        onClick={() => setNavState(!navState)}
        className={navState ? 'active' : ''}
      >
        <div></div>
        <div></div>
        <div></div>
      </MenuIcon>
      <HeaderCtn>
        <div className="logo row">
          <span>Logo</span>
          <p>App name</p>
        </div>

        <div className="content row">
          <Notifications />
          {/* FIXME: fix the error in this line :c */}
          <ProfileImg size="40px" className="image" />
          <ConfigButton />
        </div>
      </HeaderCtn>
    </>
  );
};

export default Header;
