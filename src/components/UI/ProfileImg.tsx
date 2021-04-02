import { useSelector } from 'react-redux';
import styled from '@emotion/styled';
import React from 'react';

import { ProfileImgProps } from '@interfaces/props';
import { AppCtx } from '@interfaces/context';

const ProfileImg = ({ size, url, ...rest }: ProfileImgProps) => {
  const user = useSelector((state: AppCtx) => state.user.personal);

  const ProfileCtn = styled.div`
    width: ${size};
    min-width: ${size};
    height: ${size};
    min-height: ${size};
    border-radius: 50%;

    background-image: url(${url ? url : (user && user.photoURL) || '/static/icons/app/emptyPhoto.webp'});
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
  `;

  return <ProfileCtn {...rest}></ProfileCtn>;
};

export default ProfileImg;
