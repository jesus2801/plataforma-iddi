import type { NextRouter } from 'next/router';
import app from 'firebase/app';
import Swal from 'sweetalert2';
import Rollbar from 'rollbar';

import config from './config';

// import * as admin from 'firebase-admin';

import 'firebase/firestore';
import 'firebase/storage';
import 'firebase/auth';

import { LoginState, SignupState } from '@interfaces/states';
import { handleLoading } from '@fcns/index';

export class Firebase {
  public db: app.firestore.Firestore;
  public auth: app.auth.Auth;
  public currentUser: app.User;
  public storageRef: app.storage.Reference;

  constructor() {
    if (app.apps.length === 0) {
      app.initializeApp(config);
    }

    this.db = app.firestore();
    this.auth = app.auth();
    this.currentUser = this.auth.currentUser!;
    this.storageRef = app.storage().ref();
  }

  //---------------------------------------------------------

  public async registerUser(
    data: SignupState,
    router: NextRouter,
    rollbar: Rollbar,
  ): Promise<void> {
    handleLoading(true);

    const querySnaphoot = await this.db
      .collection('users')
      .where('mail', '==', data.mail)
      .limit(1)
      .get();

    if (querySnaphoot.empty) {
      handleLoading(false);
      Swal.fire(
        '¡Error!',
        'El correo ingresado no coincide con ningún registro de estudiante del IDDI Nueva Granada',
        'error',
      );
      return;
    }

    querySnaphoot.forEach(async (doc) => {
      try {
        const userCredential = await this.auth.createUserWithEmailAndPassword(
          data.mail.trim(),
          data.password.trim(),
        );

        const { user } = userCredential;

        await user!.updateProfile({
          displayName: data.userName,
        });

        const { uid } = user!;

        await doc.ref.update({
          id: uid,
          nickname: data.userName,
          photo: null,
        });

        handleLoading(false);

        Swal.fire({
          title: '¡Bienvenido!',
          text: `Bienvenido ${data.userName}, tu usuario ha sido registrado correctamente,
              te invitamos a disfrutar de esta maravillosa plataforma!`,
          icon: 'success',
          didClose: () => {
            router.push('/app');
          },
        });
      } catch (e) {
        if (e.code === 'auth/email-already-in-use') {
          handleLoading(false);
          Swal.fire(
            '¡Error!',
            'El correo ingresado ya ha sido utilizado por otro usuario',
            'error',
          );
          return;
        }

        rollbar.error(e, 'error en registro de usuario');
        Swal.fire(
          '¡Error!',
          `Lo sentimos ha ocurrido un error al crear tu 
           usuario, por favor intenta más tarde`,
          'error',
        );
      }
    });
  }

  //---------------------------------------------------------

  public async loginUser(data: LoginState) {
    return this.auth.signInWithEmailAndPassword(data.mail, data.password);
  }
}

export default new Firebase();
