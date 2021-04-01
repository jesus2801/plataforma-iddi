import React, { useEffect, useState } from 'react';
import AppLayout from '../../../components/AppLayout';
import useCKEditor from '../../../components/UI/Editor';
import ProfileImg from '../../../components/UI/ProfileImg';
import { CustomUpload } from '../../../functions';
import { MainCtn } from '../../../styles/components/app/helps/new-help';

const NewHelp = () => {
  const { editorLoaded, CKEditor, ClassicEditor } = useCKEditor();

  const [editor, setEditor] = useState(null as any);
  const [images, setImages] = useState([] as string[]);

  const handleImages = (newValue: string) => {
    console.log(images);
    setImages([...images, newValue]);
  };

  // console.log(images);

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

        {/* const data = await toBase64(file);
      // const data = new Blob([file], { type: file.type });
      console.log(data);
      return {
        default: data,
      }; */}

        <button onClick={() => console.log(editor.getData().length)}>console data</button>
      </MainCtn>
    </AppLayout>
  );
};

export default NewHelp;
