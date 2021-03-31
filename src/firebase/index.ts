import app from 'firebase/app';
import type { NextRouter } from 'next/router';

import config from './config';

// import * as admin from 'firebase-admin';

import 'firebase/firestore';
import 'firebase/auth';

import { LoginState, SignupState } from '../interfaces/states';
import Swal from 'sweetalert2';
import { handleLoading } from '../functions';

export class Firebase {
  public db: app.firestore.Firestore;
  public auth: app.auth.Auth;
  public currentUser: app.User;

  constructor() {
    if (app.apps.length === 0) {
      app.initializeApp(config);
    }
    this.db = app.firestore();
    this.auth = app.auth();
    this.currentUser = this.auth.currentUser!;
  }

  //---------------------------------------------------------

  public async registerUser(data: SignupState, router: NextRouter): Promise<void> {
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
          console.log(e);
          return;
        }
      }
    });
  }

  //---------------------------------------------------------

  public async loginUser(data: LoginState) {
    return this.auth.signInWithEmailAndPassword(data.mail, data.password);
  }
}

export default new Firebase();
