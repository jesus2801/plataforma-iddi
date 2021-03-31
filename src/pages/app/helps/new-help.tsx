import React from 'react';
import AppLayout from '../../../components/AppLayout';
import useCKEditor from '../../../components/UI/Editor';
import ProfileImg from '../../../components/UI/ProfileImg';
import { MainCtn } from '../../../styles/components/app/helps/new-help';

const NewHelp = () => {
  const { editorLoaded, CKEditor, ClassicEditor } = useCKEditor();

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
          />
        ) : (
          <p>Cargando editor...</p>
        )}
      </MainCtn>
    </AppLayout>
  );
};

export default NewHelp;
