import React, { ChangeEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import NoSSR from '@mpth/react-no-ssr';
import Swal from 'sweetalert2';

import firebase from '@firebase/index';
import fb from 'firebase/app';

import {
  ForumAnswersLayout,
  ForumAsnwers,
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

  //state for votes
  const [votes, setVotes] = useState({
    votes: selectedForum ? selectedForum.votes : null,
    votes_count: selectedForum ? selectedForum.votes_count : null,
  });

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
      setVotes({
        votes: selectedForum.votes,
        votes_count: selectedForum.votes_count,
      });

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
      const answersRef = selectedForumRef!
        .collection('answers')
        .orderBy('votes_count', 'desc');

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
  const handleVote = () => {
    if (votes.votes === null || votes.votes_count === null) return;
    if (votes.votes.includes(personal!.uid)) return;

    setVotes({
      votes: [...votes.votes, personal!.uid],
      votes_count: votes.votes_count + 1,
    });

    selectedForumRef!
      .update({
        votes_count: fb.firestore.FieldValue.increment(1),
        votes: fb.firestore.FieldValue.arrayUnion(personal!.uid),
      })
      .catch((e) => {
        setVotes({
          votes: votes.votes!.filter((vote) => vote !== personal!.uid),
          votes_count: votes.votes_count! - 1,
        });
        rollbar.error(e, 'no se pudo añadir un voto a una respuesta de foro');
        Swal.fire(
          '¡Error!',
          'Lo sentimos, no se pudo añadir tu voto, por favor intenta más tarde',
          'error',
        );
      });
  };

  const deleteAnswers = () => {
    Swal.fire({
      title: '¿Seguro?',
      text: `¿Estas seguro de eliminar el foro? 
        ¡Recuerda que esta accion es irreversible!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'Cancelar',
    }).then(async (result) => {
      if (result.isConfirmed) {
        //timer of 6 seconds
        let timerInterval: any;
        Swal.fire({
          title: '¡Eliminando Foro!',
          html: 'Terminando en <b></b> milisegundos.',
          timer: 6000,
          timerProgressBar: true,
          didOpen: () => {
            Swal.showLoading();
            timerInterval = setInterval(() => {
              const content = Swal.getContent();
              if (content) {
                const b: any = content.querySelector('b');
                if (b) {
                  b.textContent = Swal.getTimerLeft();
                }
              }
            }, 100);
          },
          willClose: () => {
            clearInterval(timerInterval);
          },
        }).then(() => {
          router.push('/app/helps');
        });

        selectedForum!.images.forEach((image) => {
          firebase.storageRef.child(image.rute).delete().catch(reportErrorOnDeleteForum);
        });

        selectedForumRef!
          .delete()
          .then(() => {
            selectedForumRef!
              .collection('answers')
              .get()
              .then((answersSnapshot) => {
                answersSnapshot.forEach(async (answer) => {
                  const data = answer.data() as ForumAsnwers;

                  data.images.forEach((image) => {
                    firebase.storageRef
                      .child(image.rute)
                      .delete()
                      .catch(reportErrorOnDeleteForum);
                  });

                  answer.ref
                    .delete()
                    .then(() => {
                      answer.ref
                        .collection('comments')
                        .get()
                        .then((commentsSnapshot) => {
                          commentsSnapshot.forEach((comment) => {
                            comment.ref.delete().catch(reportErrorOnDeleteForum);
                          });
                        })
                        .catch(reportErrorOnDeleteForum);
                    })
                    .catch(reportErrorOnDeleteForum);
                });
              })
              .catch(reportErrorOnDeleteForum);

            selectedForumRef!
              .collection('comments')
              .get()
              .then((commentsSnapshot) => {
                commentsSnapshot.forEach((comment) => {
                  comment.ref.delete().catch(reportErrorOnDeleteForum);
                });
              })
              .catch(reportErrorOnDeleteForum);
          })
          .catch(reportErrorOnDeleteForum);
      }
    });
  };

  const reportErrorOnDeleteForum = (e: any) => {
    console.log(e);
    rollbar.critical(e, 'error el borrar foro');
    handleLoading(false);
    Swal.fire(
      '¡Error!',
      'Lo sentimos, ha ocurrido un error borrando el foro, por favor intenta más tarde',
      'error',
    );
  };

  //render data
  return (
    <AppLayout title="Curso o repaso">
      <ForumCtn>
        {selectedForum && selectedForumRef ? (
          <>
            <SubmitForumInput
              type="button"
              value="Eliminar el foro"
              className="delete-forum"
              onClick={deleteAnswers}
            />

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

              <p className="vote-forum" onClick={handleVote}>
                {votes.votes && (
                  <img
                    src={
                      votes.votes.includes(personal!.uid)
                        ? '/static/icons/app/heart-fill.png'
                        : '/static/icons/app/heart.png'
                    }
                    alt="heart icon"
                  />
                )}
                {votes.votes_count} votos
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
                forumComments.map((com) => (
                  <Comment
                    key={com.id}
                    data={com}
                    creator={author}
                    docRef={selectedForumRef!.collection('comments').doc(com.id)}
                  />
                ))}
            </NoSSR>

            <a href={`/app/helps/add-answer?forum=${query.id}`} target="_blank">
              <SubmitForumInput
                type="button"
                value="Agregar una respuesta"
                className="add-answer"
              />
            </a>

            <NoSSR>
              {forumAnswers &&
                forumAnswers.map((ans) => (
                  <Answer key={ans.id} creator={author} data={ans} />
                ))}
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
