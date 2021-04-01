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

export class CustomUpload {
  private uploadTask: fb.storage.UploadTask | null;
  private child: null | fb.storage.Reference;

  constructor(private loader: any, private handleImages: any) {
    this.uploadTask = null;
    this.child = null;
  }

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
        this.child = firebase.storageRef.child(`forums/${v4()}`);
        this.uploadTask = this.child.put(file);

        this.uploadTask.on(
          'state_changed',
          (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
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
            this.loader.uploaded = true;
            this.uploadTask!.snapshot.ref.getDownloadURL().then((downloadURL) => {
              this.handleImages({
                rute: this.child!.fullPath,
                url: downloadURL,
              });

              resolve({ default: downloadURL });
            });
          },
        );
      });
    });
  }

  public abort() {
    this.uploadTask!.cancel();
  }
}
