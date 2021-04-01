import firebase from '@firebase/index';
import Swal from 'sweetalert2';
import fb from 'firebase/app';
import { v4 } from 'uuid';

export function returnImageRemoved(event: any): null | string[] {
  const differ = event.source.differ;

  // if no difference
  if (differ.isEmpty) {
    return null;
  }

  const changes = differ.getChanges({
    includeChangesInGraveyard: true,
  });

  if (changes.length === 0) {
    return null;
  }

  let hasNoImageRemoved = true;

  // check any image remove or not
  for (let i = 0; i < changes.length; i++) {
    const change = changes[i];
    // if image remove exists
    if (change && change.type === 'remove' && change.name === 'image') {
      hasNoImageRemoved = false;
      break;
    }
  }

  // if not image remove stop execution
  if (hasNoImageRemoved) {
    return null;
  }

  // get removed nodes
  const removedNodes = changes.filter(
    (change: any) => change.type === 'insert' && change.name === 'image',
  );

  // removed images src
  const removedImagesSrc = [];
  // removed image nodes
  const removedImageNodes = [];

  for (let i = 0, n = removedNodes.length; i < n; i++) {
    const removedNode = removedNodes[i].position.nodeAfter;
    removedImageNodes.push(removedNode);
    removedImagesSrc.push(removedNode.getAttribute('src'));
  }
  return removedImagesSrc;
}

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
