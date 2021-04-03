import React, { ChangeEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import NoSSR from '@mpth/react-no-ssr';
import Swal from 'sweetalert2';

import firebase from '@firebase/index';

import {
  ForumAnswersLayout,
  ForumComment,
  ForumCommentLayout,
  PublicUserInfo,
} from '@interfaces/index';

import ProfileImg from '@cmpnts/UI/ProfileImg';
import AppLayout from '@cmpnts/AppLayout';
import withAuth from '@cmpnts/withAuth';

import { convertToDate, handleLoading } from '@fcns/index';
import { ForumFooter } from '@styles/app/helps';

import {
  CommentInput,
  ForumCtn,
  ForumTitle,
  MainCtn,
  SubmitForumInput,
} from '@styles/app/helps/helps';

import { getSelectedForum } from 'context/actions/forums.actions';
import { AppCtx } from '@interfaces/context';
import Comment from '@cmpnts/app/forums/Comment';
import { defaultPhotoRute } from 'utils/variables';
import Answer from '@cmpnts/app/forums/Answer';

const Help = () => {
  //component page states
  const [author, setAuthor] = useState(null as null | PublicUserInfo);
  const [forumComments, setForumComments] = useState(null as null | ForumCommentLayout[]);
  const [forumAnswers, setForumsAnswers] = useState(null as null | ForumAnswersLayout[]);

  //comment state
  const [comment, setComment] = useState('');

  //extracting the selected forum in the global store
  const {
    forums: { selectedForum, selectedForumRef },
    user: { publicInfo, rollbar, personal },
  } = useSelector((state: AppCtx) => state);

  //next router
  const router = useRouter();

  //extracting dispatch for fire actions
  const dispatch = useDispatch();

  //destructuring the id
  const { query } = router;

  //get the forum
  useEffect(() => {
    if (query) {
      if (!query.id) router.push('/');

      dispatch(getSelectedForum(query.id as string, router, rollbar));
    }
  }, [query]);

  //get author info and comments info
  useEffect(() => {
    if (selectedForum) {
      selectedForum.author
        .get()
        .then((a) => {
          setAuthor(a.data() as PublicUserInfo);
        })
        .catch((e) => {
          rollbar.error(e, `no se pudo obtener la información del creador de un foro`);
          Swal.fire(
            '¡Error!',
            `Lo sentimos, ha ocurrido un error extrayendo
            la información del usuario creador del foro, 
            por favor intenta más tarde`,
            'error',
          );
        });
    }
  }, [selectedForum]);

  useEffect(() => {
    if (selectedForumRef && forumComments === null) {
      const commentsRef = selectedForumRef!.collection('comments');

      commentsRef
        .get()
        .then((allCommentsSnaphot) => {
          if (allCommentsSnaphot.empty) {
            setForumComments([]);
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

          setForumComments(comments);
        })
        .catch((e) => {
          rollbar.error(e, 'error al obtener los comentarios de un foro');
          Swal.fire(
            '¡Error!',
            `Lo sentimos ha ocurrido un error
            al obtener los comentarios de este
            foro, por favor intenta más tarde`,
            'error',
          );
        });
    }
  }, [selectedForumRef]);

  useEffect(() => {
    if (selectedForumRef && forumAnswers === null) {
      const answersRef = selectedForumRef!.collection('answers');

      answersRef
        .get()
        .then((allAnswersSnapshot) => {
          if (allAnswersSnapshot.empty) {
            setForumsAnswers([]);
            return;
          }

          let answers: ForumAnswersLayout[] = [];

          for (let i = 0, n = allAnswersSnapshot.docs.length; i < n; i++) {
            const doc = allAnswersSnapshot.docs[i];
            answers.push({
              ...doc.data(),
              id: doc.id,
            } as ForumAnswersLayout);
          }

          setForumsAnswers(answers);
        })
        .catch((e) => {
          rollbar.error(e, 'error al obtener las respuestas de un foro');
          Swal.fire(
            '¡Error!',
            `Lo sentimos ha ocurrido un error
            al obtener las respuestas de este
            foro, por favor intenta más tarde`,
            'error',
          );
        });
    }
  }, [selectedForumRef]);

  //hadle change in comment textara
  const handleComment = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.currentTarget.value);
  };

  //when user comment a message
  const onComment = async () => {
    if (comment.trim() === '') {
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

    const newComment: ForumComment = {
      author: firebase.db.collection('users').doc(publicInfo.docId),
      comment: comment,
      date: Date.now(),
    };

    try {
      const a = await selectedForumRef!.collection('comments').add(newComment);
      handleLoading(false);
      setComment('');

      setForumComments([
        {
          ...newComment,
          id: a.id,
        },
        ...forumComments!,
      ]);
    } catch (e) {
      handleLoading(false);
      rollbar.error(e, 'error al comentar en un foro');
      Swal.fire(
        '¡Error!',
        `Losentimos, no hemos podido agregar su 
        comentario, por favor intente más tarde`,
        'error',
      );
    }
  };

  // TODO: finish the handle vote
  const handleVote = () => {};

  //render data
  return (
    <AppLayout title="Curso o repaso">
      <ForumCtn>
        {selectedForum ? (
          <>
            <MainCtn>
              <div className="author">
                <ProfileImg
                  size="110px"
                  url={author ? author.photo || defaultPhotoRute : defaultPhotoRute}
                />

                <div className="info">
                  <p>
                    {author ? author.nickname : 'cargando...'} -{' '}
                    <span>{author ? author.name : 'cargando...'}</span>
                  </p>

                  <p>
                    {author
                      ? `${author.rol}${author.grade && ' - ' + author.grade + '° grado'}`
                      : 'cargando....'}
                  </p>
                </div>
              </div>

              <ForumTitle>{selectedForum.title}</ForumTitle>

              <div
                className="ck-content"
                dangerouslySetInnerHTML={{ __html: selectedForum.content }}
              ></div>

              <p className="vote-forum">
                <img
                  src={
                    selectedForum.votes.includes(personal!.uid)
                      ? '/static/icons/app/heart-fill.png'
                      : '/static/icons/app/heart.png'
                  }
                  alt="heart icon"
                  onClick={handleVote}
                />
                {selectedForum.votes_count} votos
              </p>

              <ForumFooter className="forum-footer">
                <p>Hace {convertToDate(Date.now() - selectedForum.date)}</p>
                <p>{selectedForum && selectedForum.category}</p>
              </ForumFooter>
            </MainCtn>

            <CommentInput>
              <div className="add-comment">
                <textarea
                  placeholder="Agrega un comentario"
                  onChange={handleComment}
                  value={comment}
                  rows={1}
                ></textarea>
                <button type="button" onClick={onComment}>
                  Comentar
                </button>
              </div>
            </CommentInput>

            <NoSSR>
              {forumComments &&
                forumComments.map((com) => <Comment key={com.id} data={com} />)}
            </NoSSR>

            <a href={`/app/helps/add-answer?forum=${query.id}`} target="_blank">
              <SubmitForumInput
                type="button"
                value={`Agregar una respuesta`}
                className="add-answer"
              />
            </a>

            <NoSSR>
              {forumAnswers &&
                forumAnswers.map((ans) => <Answer key={ans.id} data={ans} />)}
            </NoSSR>
          </>
        ) : (
          'cargando...'
        )}
      </ForumCtn>
    </AppLayout>
  );
};

export default withAuth(Help);
