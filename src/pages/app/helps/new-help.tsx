import React, { useState } from 'react';
import AppLayout from '../../../components/AppLayout';
import useCKEditor from '../../../hooks/useCKEditor';
import ProfileImg from '../../../components/UI/ProfileImg';
import { CustomUpload } from '../../../functions';
import { MainCtn } from '../../../styles/components/app/helps/new-help';
import { returnImageRemoved } from '../../../functions/CKEditor';
import { CKEditorImagesState } from '../../../interfaces/states';

import firebase from '../../../firebase';

const NewHelp = () => {
  const { editorLoaded, CKEditor, ClassicEditor } = useCKEditor();

  const [editor, setEditor] = useState(null as any);
  const [images, setImages] = useState([] as CKEditorImagesState[]);

  const handleImages = (newValue: CKEditorImagesState) => {
    setImages((prevValue) => [...prevValue, newValue]);
  };

  const deleteImage = async (rute: string) => {
    try {
      await firebase.storageRef.child(rute).delete();

      setImages((prevValue) => {
        return prevValue.filter((value) => value.rute === rute);
      });
    } catch (e) {
      return;
    }
  };

  return (
    <AppLayout title="Nuevo curso o repaso">
      <MainCtn>
        <div className="author">
          <ProfileImg size="110px" />
          <div className="info">
            <p>
              Josefo varss <span>- (Jesús David García Vargas)</span>
            </p>
            <p>Student - 11° grado</p>
          </div>
        </div>

        <textarea
          className="title-input"
          placeholder="Ingresa el titulo del foro"
        ></textarea>

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

        <button onClick={() => console.log(editor.getData())}>console data</button>
      </MainCtn>
    </AppLayout>
  );
};

export default NewHelp;
