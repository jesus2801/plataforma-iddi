import Swal from 'sweetalert2';
import { v4 } from 'uuid';
import fb from 'firebase/app';

import firebase from '../firebase';

export const handleLoading = (state: boolean, title?: string): void => {
  if (state) {
    Swal.fire({
      title: title || 'Cargando',
      didOpen: () => {
        Swal.showLoading();
      },
    });
    return;
  }

  Swal.close();
};

let uploadTask: fb.storage.UploadTask | null;

export class CustomUpload {
  constructor(private loader: any, private handleImages: any) {}

  public upload() {
    return this.loader.file.then(async (file: File) => {
      if (file.size > 3000000) {
        Swal.fire(
          '¡Error!',
          'El tamaño máximo para imagenes en los foros son de 3MB',
          'error',
        );
        this.loader.abort();
        return;
      }
      return new Promise((resolve) => {
        const rute = `forums/${v4()}`;
        uploadTask = firebase.storage.ref().child(rute).put(file);
        uploadTask.on(
          'state_changed',
          (snapshot) => {
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            this.loader.uploadedPercent = progress;
          },
          //on error
          () => {
            Swal.fire(
              '¡Error!',
              'Lo sentimos, ha ocurrido un error en la subida de tu imagen, porfavor intenta más tarde',
              'error',
            );
            this.loader.uploaded = false;
            this.loader.abort();
          },
          //on success
          () => {
            this.handleImages(rute);
            this.loader.uploaded = true;
            uploadTask!.snapshot.ref.getDownloadURL().then(function (downloadURL) {
              resolve({ default: downloadURL });
            });
          },
        );
      });
    });
  }

  public abort() {
    uploadTask!.cancel();
  }
}
