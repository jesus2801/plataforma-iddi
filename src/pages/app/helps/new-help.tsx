import React, { FormEvent, useState } from 'react';
import Swal from 'sweetalert2';
import { useSelector } from 'react-redux';

import AppLayout from '../../../components/AppLayout';
import useCKEditor from '../../../hooks/useCKEditor';
import ProfileImg from '../../../components/UI/ProfileImg';

import {
  MainCtn,
  SubmitForumInput,
  TitleForumInput,
} from '../../../styles/components/app/helps/new-help';

import Select from '../../../components/UI/Select';
import SelectSprite from '../../../components/UI/SelectSprite';
import Categories from '../../../components/UI/Categories';

import { CustomUpload } from '../../../functions';
import { returnImageRemoved } from '../../../functions/CKEditor';
import { CKEditorImagesState } from '../../../interfaces/states';

import firebase from '../../../firebase';
import { AppCtx } from '../../../interfaces/context';
import { isEmpty } from '../../../functions/validate';

//---------------------------------------------------------------
//                 GLOBAL IMPORTS - PAGE COMPONENT
//---------------------------------------------------------------

const NewHelp = () => {
  //variables for useCKEditor
  const { editorLoaded, CKEditor, ClassicEditor } = useCKEditor();

  //states
  const [editor, setEditor] = useState(null as any);
  const [images, setImages] = useState([] as CKEditorImagesState[]);

  const [form, setForm] = useState({
    title: '',
    category: '',
  });

  //destructurintg form values
  const { title, category } = form;

  //destructuring public user info form main store
  const { publicInfo } = useSelector((state: AppCtx) => state.user);

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
  const deleteImage = async (rute: string) => {
    try {
      await firebase.storageRef.child(rute).delete();

      setImages((prevValue) => {
        return prevValue.filter((value) => value.rute !== rute);
      });
    } catch (e) {
      return;
    }
  };

  //when user submit the form
  const handleSubmit = () => {
    if (!publicInfo) {
      Swal.fire(
        '¡Error!',
        'Porfavor espere a que la aplicación termine de cargar',
        'error',
      );
      return;
    }

    const data: string = editor.getData();

    if (isEmpty(data, title, category)) {
      Swal.fire('¡Error!', 'Porfavor rellene correctamente todos los campos', 'error');
      return;
    }

    //send data to server
  };

  // render data
  return (
    <AppLayout title="Nuevo curso o repaso">
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
          rows={1}
          onInput={handleTitleInput}
          value={title}
        ></TitleForumInput>

        {editorLoaded && ClassicEditor ? (
          <CKEditor
            editor={ClassicEditor.default}
            config={{
              placeholder: 'En este editor puedes escribir todo el contenido de tu foro',
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
                return new CustomUpload(loader, handleImages);
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
    </AppLayout>
  );
};

export default NewHelp;
