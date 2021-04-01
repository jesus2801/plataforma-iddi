import { useState, useEffect, useRef } from 'react';

const useCKEditor = () => {
  const editorRef: any = useRef();
  const [editorLoaded, setEditorLoaded] = useState(false);
  const { CKEditor, ClassicEditor } = editorRef.current || ({} as any);

  useEffect(() => {
    const main = async () => {
      editorRef.current = {
        CKEditor: (await import('@ckeditor/ckeditor5-react')).CKEditor,
        ClassicEditor: await import('@ckeditor/ckeditor5-build-classic'),
      };
      setEditorLoaded(true);
    };
    main();
  }, []);

  return Object.freeze({
    editorLoaded,
    CKEditor,
    ClassicEditor,
  });
};

export default useCKEditor;
