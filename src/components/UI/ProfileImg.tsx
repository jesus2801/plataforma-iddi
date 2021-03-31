import React from 'react';
import styled from '@emotion/styled';

import { ProfileImgProps } from '../../interfaces/props';
import { NextPage } from 'next';
import { useSelector } from 'react-redux';
import { AppCtx } from '../../interfaces/context';

const ProfileImg: NextPage<ProfileImgProps> = ({ size, ...rest }) => {
  const user = useSelector((state: AppCtx) => state.user.personal);

  const ProfileCtn = styled.div`
    width: ${size};
    min-width: ${size};
    height: ${size};
    min-height: ${size};
    border-radius: 50%;

    background-image: url(${user!.photoURL || '/static/icons/app/emptyPhoto.svg'});
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
  `;

  return <ProfileCtn {...rest}></ProfileCtn>;
};

export default ProfileImg;
