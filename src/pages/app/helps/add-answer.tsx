import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';

import { ForumCtn, MainCtn, SubmitForumInput } from '@styles/app/helps/helps';

import useCKEditor from '@hooks/useCKEditor';

import ProfileImg from '@cmpnts/UI/ProfileImg';
import AppLayout from '@cmpnts/AppLayout';

import { returnImageRemoved } from '@fcns/CKEditor';
import { CustomUpload } from '@fcns/CKEditor';
import { isEmpty } from '@fcns/validate';

import firebase from '@firebase/index';
import fb from 'firebase/app';

import { CKEditorImagesState } from '@interfaces/states';
import { AppCtx } from '@interfaces/context';

import withAuth from '@cmpnts/withAuth';
import { handleLoading } from '@fcns/index';
import { ForumAsnwers } from '@interfaces/index';

//---------------------------------------------------------------
//                 GLOBAL IMPORTS - PAGE COMPONENT
//---------------------------------------------------------------

const NewAnswer = () => {
  //variables for useCKEditor
  const { editorLoaded, CKEditor, ClassicEditor } = useCKEditor();

  //states
  const [editor, setEditor] = useState(null as any);
  const [images, setImages] = useState([] as CKEditorImagesState[]);

  //router for redirect user after upload forum
  const router = useRouter();

  //desrtucturing query
  const {
    query: { forum },
  } = router;

  //destructuring public user info and rollbar from global sotore
  const { publicInfo, rollbar } = useSelector((state: AppCtx) => state.user);

  //handle images when user put a new image on the editor
  const handleImages = (newValue: CKEditorImagesState) => {
    setImages((prevValue) => [...prevValue, newValue]);
  };

  // when user delete a image from the editor
  const deleteImage = (rute: string) => {
    firebase.storageRef
      .child(rute)
      .delete()
      .then(() => {
        setImages((prevValue) => {
          return prevValue.filter((value) => value.rute !== rute);
        });
      })
      .catch((e) => {
        rollbar.error(e, 'imagen no se pudo eliminar en respuesta');
      });
  };

  //when user submit the form
  const handleSubmit = async () => {
    //if user submit the form before publicInfo is download
    if (!publicInfo) {
      Swal.fire(
        '¡Error!',
        'Porfavor espere a que la aplicación termine de cargar',
        'error',
      );
      return;
    }

    if (!forum) {
      Swal.fire(
        '¡Error!',
        `Lo sentimos, esta ruta no está permitida para subir 
        respuestas, por favor acceda a una ruta válida clickeando 
        en los botones de "agregar respuesta" que se encuentran en
        cada foro`,
        'error',
      );
      return;
    }

    //get editor data
    const data: string = editor.getData();

    //show error if some data is empty
    if (isEmpty(data)) {
      Swal.fire('¡Error!', 'Porfavor rellene correctamente todos los campos', 'error');
      return;
    }

    handleLoading(true);

    //build the message or answer to send of server
    const answer: ForumAsnwers = {
      author: firebase.db.collection('users').doc(publicInfo.docId),
      content: data,
      images: images,
      votes: [],
      votes_count: 0,
      date: Date.now(),
    };

    try {
      await firebase.db
        .collection('forums')
        .doc(forum as string)
        .collection('answers')
        .add(answer);

      await firebase.db
        .collection('forums')
        .doc(forum as string)
        .update({
          answers_count: fb.firestore.FieldValue.increment(1),
        });

      //close the loader
      handleLoading(false);

      //success upload
      Swal.fire({
        title: 'Respusta subida!',
        text: `¡Felicidades!, hemos subido tu respuesta
        exitosamente, te invitamos a disfrutar de ella`,
        icon: 'success',
        didClose: () => {
          router.push(`/app/helps/help?id=${forum}`);
        },
      });
    } catch (e) {
      rollbar.error(e, 'fallo en la subida de un foro');

      //close the loader
      handleLoading(false);

      //failed upload
      Swal.fire(
        '¡Error!',
        `Lo sentimos, no hemos podido subir tu respuesta, 
         porfavor intenta más tarde`,
        'error',
      );
    }
  };

  // render data
  return (
    <AppLayout title="Nuevo respuesta a foro">
      <ForumCtn>
        <MainCtn>
          <div className="author">
            <ProfileImg size="110px" />
            <div className="info">
              {publicInfo && (
                <>
                  <p>
                    {publicInfo.nickname} <span>- ({publicInfo.name})</span>
                  </p>
                  <p>
                    {publicInfo.rol}
                    {publicInfo.grade && ` - ${publicInfo.grade}° grado`}
                  </p>
                </>
              )}
            </div>
          </div>

          {editorLoaded && ClassicEditor ? (
            <CKEditor
              editor={ClassicEditor.default}
              config={{
                placeholder:
                  'En este editor puedes escribir todo el contenido de tu respuesta',
              }}
              onReady={(editor: any) => {
                setEditor(editor);

                editor.model.document.on('change:data', (event: any) => {
                  const imagesRemoved = returnImageRemoved(event);

                  if (imagesRemoved) {
                    const imgRmved: string = imagesRemoved[0];

                    setImages((prevValue) => {
                      for (let i = 0, n = prevValue.length; i < n; i++) {
                        if (prevValue[i].url === imgRmved) {
                          deleteImage(prevValue[i].rute);
                        }
                      }
                      return prevValue;
                    });
                  }
                });

                editor.plugins.get('FileRepository').createUploadAdapter = (
                  loader: any,
                ) => {
                  return new CustomUpload(loader, handleImages, rollbar);
                };
              }}
            />
          ) : (
            <p>Cargando editor...</p>
          )}

          <SubmitForumInput
            type="button"
            onClick={handleSubmit}
            value="Agregar respuesta"
          />
        </MainCtn>
      </ForumCtn>
    </AppLayout>
  );
};

export default withAuth(NewAnswer);
