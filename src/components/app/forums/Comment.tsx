import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import ProfileImg from '@cmpnts/UI/ProfileImg';

import { convertToDate } from '@fcns/index';

import { AppCtx } from '@interfaces/context';
import { PublicUserInfo } from '@interfaces/index';
import { ForumCommentProps } from '@interfaces/props';

import { CommentForumDiv } from '@styles/app/helps/helps';
import { defaultPhotoRute } from 'utils/variables';

const Comment = ({ data }: ForumCommentProps) => {
  const [author, setAuthor] = useState(null as null | PublicUserInfo);

  const rollbar = useSelector((state: AppCtx) => state.user.rollbar);

  useEffect(() => {
    data.author
      .get()
      .then((a) => {
        setAuthor(a.data() as PublicUserInfo);
      })
      .catch((e) => {
        rollbar.error(
          e,
          `error obteniendo la public info de 
          un creador de comentario de foro`,
        );
      });
  }, []);

  return (
    <CommentForumDiv>
      <ProfileImg
        size="80px"
        url={author ? author.photo || defaultPhotoRute : defaultPhotoRute}
      />

      <div className="info">
        <p>
          <span>{author ? author.nickname : 'Cargando...'}</span>
          {author && author.grade && ` - ${author.grade}° grado`}
        </p>
        <p>{data.comment}</p>
        <p>Hace {convertToDate(Date.now() - data.date)}</p>
      </div>
    </CommentForumDiv>
  );
};

export default Comment;
