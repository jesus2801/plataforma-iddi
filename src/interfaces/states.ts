export interface LoginState {
  mail: string;
  password: string;
}

export interface SignupState {
  userName: string;
  mail: string;
  password: string;
  password2: string;
}

export type ForumsFilter =
  | 'recent'
  | 'ancient'
  | 'more-votes'
  | 'less-votes'
  | 'user-forums';

export interface CKEditorImagesState {
  url: string;
  rute: string;
}
