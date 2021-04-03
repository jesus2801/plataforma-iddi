import React, { ChangeEvent, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import ProfileImg from '@cmpnts/UI/ProfileImg';

import { ForumComment, ForumCommentLayout, PublicUserInfo } from '@interfaces/index';
import { AppCtx } from '@interfaces/context';
import { ForumAnswerProps } from '@interfaces/props';

import { defaultPhotoRute } from 'utils/variables';

import { convertToDate, handleLoading } from '@fcns/index';

import firebase from '@firebase/index';

import { CommentInput, MainCtn } from '@styles/app/helps/helps';
import { ForumFooter } from '@styles/app/helps';
import Comment from './Comment';
import Swal from 'sweetalert2';

const Answer = ({ data }: ForumAnswerProps) => {
  const [author, setAuthor] = useState(null as null | PublicUserInfo);
  const [comments, setComments] = useState(null as null | ForumCommentLayout[]);

  const [newComment, setNewComment] = useState('');

  const {
    forums: { selectedForumRef },
    user: { rollbar, publicInfo, personal },
  } = useSelector((state: AppCtx) => state);

  useEffect(() => {
    data.author
      .get()
      .then((a) => {
        setAuthor(a.data() as PublicUserInfo);
      })
      .catch((e) => {
        rollbar.error(e, 'fallo al encontrar la informacion de un autor de respuesta');
      });

    selectedForumRef!
      .collection('answers')
      .doc(data.id)
      .collection('comments')
      .get()
      .then((allCommentsSnaphot) => {
        if (allCommentsSnaphot.empty) {
          setComments([]);
          return;
        }

        let comments: ForumCommentLayout[] = [];

        for (let i = 0, n = allCommentsSnaphot.docs.length; i < n; i++) {
          const doc = allCommentsSnaphot.docs[i];
          comments.push({
            ...doc.data(),
            id: doc.id,
          } as ForumCommentLayout);
        }

        setComments(comments);
      })
      .catch((e) => {
        rollbar.error(e, 'fallo al obtener comentarios de respuesta de foro');
      });
  }, []);

  const handleComment = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setNewComment(e.currentTarget.value);
  };

  const onComment = async () => {
    if (newComment.trim() === '') {
      Swal.fire('¡Error!', 'No puedes enviar un comentario vacio', 'error');
      return;
    }

    if (!publicInfo) {
      Swal.fire(
        '¡Error!',
        'Porfavor espere a que termine de cargar la aplicación',
        'error',
      );
      return;
    }

    handleLoading(true);

    const commentObj: ForumComment = {
      author: firebase.db.collection('users').doc(publicInfo.docId),
      comment: newComment,
      date: Date.now(),
    };

    try {
      const a = await selectedForumRef!
        .collection('answers')
        .doc(data.id)
        .collection('comments')
        .add(commentObj);

      handleLoading(false);
      setNewComment('');

      setComments([
        {
          ...commentObj,
          id: a.id,
        },
        ...comments!,
      ]);
    } catch (e) {
      handleLoading(false);
      rollbar.error(e, 'error al publicar un comentario de una respuesta de foro');
      Swal.fire(
        '¡Error!',
        `Lo sentimos, ha ocurrido un error al 
        subir tu comentario, por favor intenta 
        más tarde`,
        'error',
      );
    }
  };

  //TODO: finish the handle vote
  const handleVote = () => {};

  return (
    <>
      <MainCtn>
        <div className="author">
          <ProfileImg
            size="110px"
            url={author ? author.photo || defaultPhotoRute : defaultPhotoRute}
          />

          <div className="info">
            {author && (
              <>
                <p>
                  {author.nickname} <span>- ({author.name})</span>
                </p>
                <p>
                  {author.rol}
                  {author.grade && ` - ${author.grade}° grado`}
                </p>
              </>
            )}
          </div>
        </div>

        <div
          className="ck-content"
          dangerouslySetInnerHTML={{ __html: data.content }}
        ></div>

        <ForumFooter className="forum-footer">
          <p>Hace {convertToDate(Date.now() - data.date)}</p>
          <span className="vote-forum">
            <img
              src={
                data.votes.includes(personal!.uid)
                  ? '/static/icons/app/heart-fill.png'
                  : '/static/icons/app/heart.png'
              }
              alt="heart icon"
              onClick={handleVote}
            />
            {data.votes_count} votos
          </span>
        </ForumFooter>
      </MainCtn>

      <CommentInput>
        <div className="add-comment">
          <textarea
            placeholder="Agrega un comentario"
            onChange={handleComment}
            value={newComment}
            rows={1}
          ></textarea>
          <button type="button" onClick={onComment}>
            Comentar
          </button>
        </div>
      </CommentInput>

      {comments && comments.map((com) => <Comment key={com.id} data={com} />)}
    </>
  );
};

export default Answer;
