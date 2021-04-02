import React, { FormEvent, useState } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';

import {
  ForumCtn,
  MainCtn,
  SubmitForumInput,
  TitleForumInput,
} from '@styles/app/helps/helps';

import useCKEditor from '@hooks/useCKEditor';

import SelectSprite from '@cmpnts/UI/SelectSprite';
import ProfileImg from '@cmpnts/UI/ProfileImg';
import Categories from '@cmpnts/UI/Categories';
import AppLayout from '@cmpnts/AppLayout';
import Select from '@cmpnts/UI/Select';

import { returnImageRemoved } from '@fcns/CKEditor';
import { CustomUpload } from '@fcns/CKEditor';
import { isEmpty } from '@fcns/validate';

import firebase from '@firebase/index';

import { HelpForum, ForumCategory } from '@interfaces/index';
import { CKEditorImagesState } from '@interfaces/states';
import { AppCtx } from '@interfaces/context';

import withAuth from '@cmpnts/withAuth';
import { handleLoading } from '@fcns/index';

//---------------------------------------------------------------
//                 GLOBAL IMPORTS - PAGE COMPONENT
//---------------------------------------------------------------

const NewHelp = () => {
  //variables for useCKEditor
  const { editorLoaded, CKEditor, ClassicEditor } = useCKEditor();

  //states
  const [editor, setEditor] = useState(null as any);
  const [images, setImages] = useState([] as CKEditorImagesState[]);

  //state of form data
  const [form, setForm] = useState({
    title: '',
    category: '',
  });

  //router for redirect user after upload forum
  const router = useRouter();

  //destructurintg form values
  const { title, category } = form;

  //destructuring public user info form main store
  const { publicInfo, rollbar } = useSelector((state: AppCtx) => state.user);

  //handle images when user put a new image on the editor
  const handleImages = (newValue: CKEditorImagesState) => {
    setImages((prevValue) => [...prevValue, newValue]);
  };

  //handle change of select category
  const handleChangeSelect = (e: FormEvent<HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({
      ...form,
      category: e.currentTarget.value,
    });
  };

  //when user is typing in the title input
  const handleTitleInput = (e: FormEvent<HTMLTextAreaElement>) => {
    e.currentTarget.value = e.currentTarget.value.replace('\n', ' ').replace('  ', ' ');
    setForm({ ...form, title: e.currentTarget.value });
    e.currentTarget.style.height = 'auto';
    e.currentTarget.style.height = `${e.currentTarget.scrollHeight}px`;
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
        console.log(e);
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

    handleLoading(true);
    //get editor data
    const data: string = editor.getData();

    //show error if some data is empty
    if (isEmpty(data, title, category)) {
      Swal.fire('¡Error!', 'Porfavor rellene correctamente todos los campos', 'error');
      return;
    }

    //build the forum to send of server
    const forum: HelpForum = {
      author: firebase.db.collection('users').doc(publicInfo.docId),
      title: title,
      content: data,
      category: category as ForumCategory,
      votes: [],
      votes_count: 0,
      answers: [],
      images: images,
      date: Date.now(),
    };

    try {
      //upload the forum
      await firebase.db.collection('forums').add(forum);

      //close the loader
      handleLoading(false);

      //success upload
      Swal.fire({
        title: '¡Foro subido!',
        text: `¡Felicidades!, hemos subido tu foro
        exitosamente, te invitamos a disfrutar de él`,
        icon: 'success',
        didClose: () => {
          router.push('/app/helps');
        },
      });
    } catch (e) {
      //close the loader
      handleLoading(false);

      //failed upload
      Swal.fire(
        '¡Error!',
        `Lo sentimos, no hemos podido subir tu foro, 
         porfavor intenta más tarde`,
        'error',
      );
    }
  };

  // render data
  return (
    <AppLayout title="Nuevo curso o repaso">
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

          <TitleForumInput
            className="title-input"
            placeholder="Ingresa el titulo del foro"
            onInput={handleTitleInput}
            value={title}
            rows={2}
          ></TitleForumInput>

          {editorLoaded && ClassicEditor ? (
            <CKEditor
              editor={ClassicEditor.default}
              config={{
                placeholder:
                  'En este editor puedes escribir todo el contenido de tu foro',
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

          <Select
            minWidth="200px"
            onChange={handleChangeSelect}
            defaultValue={category}
            className="select-categories"
          >
            <Categories />
          </Select>
          <SelectSprite />

          <SubmitForumInput type="button" onClick={handleSubmit} value="Iniciar foro" />
        </MainCtn>
      </ForumCtn>
    </AppLayout>
  );
};

export default withAuth(NewHelp);
