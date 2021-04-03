import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import ProfileImg from '@cmpnts/UI/ProfileImg';

import { convertToDate } from '@fcns/index';

import { AppCtx } from '@interfaces/context';
import { PublicUserInfo } from '@interfaces/index';
import { ForumCommentProps } from '@interfaces/props';

import { CommentForumDiv } from '@styles/app/helps/helps';
import { defaultPhotoRute } from 'utils/variables';
import Swal from 'sweetalert2';

const Comment = ({ data, creator, docRef }: ForumCommentProps) => {
  const [author, setAuthor] = useState(null as null | PublicUserInfo);
  const [show, setShow] = useState(true);

  const { rollbar, personal } = useSelector((state: AppCtx) => state.user);

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

  const deleteComment = () => {
    setShow(false);

    docRef.delete().catch((e) => {
      setShow(true);
      rollbar.error(e, 'error al eliminar comentario de foro');
      Swal.fire(
        '¡Error!',
        'Lo sentimos, no hemos podido eliminar tu comentario, por favor intenta más tarde',
        'error',
      );
    });
  };

  return show ? (
    <CommentForumDiv>
      <div className="author">
        <ProfileImg
          size="80px"
          url={author ? author.photo || defaultPhotoRute : defaultPhotoRute}
        />
        <div className="info">
          <p>
            <span>{author ? author.nickname : 'Cargando...'}</span>
            {author && author.grade && ` - ${author.grade}° grado`}
            <span>
              {creator && author ? author.id === creator.id && ' creador del foro' : null}
            </span>
          </p>
          <p>{data.comment}</p>
          <p>Hace {convertToDate(Date.now() - data.date)}</p>
        </div>
      </div>
      {author && personal!.uid === author.id ? (
        <div className="options">
          <div>
            <li onClick={deleteComment}>Eliminar</li>
          </div>
          <img
            src="/static/icons/app/options.png"
            alt="options icon"
            onClick={(e) =>
              e.currentTarget.parentNode!.querySelector('div')!.classList.toggle('active')
            }
          />
        </div>
      ) : null}
    </CommentForumDiv>
  ) : null;
};

export default Comment;
