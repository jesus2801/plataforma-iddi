import { NextApiRequest, NextApiResponse } from 'next/types';
import { CKEditorImagesState } from './states';
import firebase from 'firebase/app';

export interface ErrorProps {
  err: any;
  req: NextApiRequest;
  res: NextApiResponse;
}

export interface StatusCode {
  statusCode: number;
}

export type User = firebase.User | null;

export interface PublicUserInfo {
  grade: number;
  id: string;
  mail: string;
  name: string;
  nickname: string;
  photo: null | string;
  rol: 'student' | 'leader' | 'admin';
  docId: string;
}

type FirebaseDocReference = firebase.firestore.DocumentReference<firebase.firestore.DocumentData>;

export interface ForumComment {
  author: FirebaseDocReference;
  comment: string;
  date: number;
}

export interface ForumCommentLayout extends ForumComment {
  id: string;
}

export interface ForumAsnwers {
  author: FirebaseDocReference;
  content: string;
  images: CKEditorImagesState[];
  comments?: firebase.firestore.CollectionReference<firebase.firestore.DocumentData>;
  votes: string[];
  votes_count: number;
  date: number;
}

export interface ForumAnswersLayout extends ForumAsnwers {
  id: string;
}

export type ForumCategory =
  | 'art'
  | 'natural sciences'
  | 'sports'
  | 'economy'
  | 'entrepreneurship'
  | 'philosophy & language'
  | 'math'
  | 'technology'
  | 'society';

export interface HelpForum {
  author: FirebaseDocReference;
  title: string;
  content: string;
  category: ForumCategory;
  votes: string[];
  votes_count: number;
  comments?: firebase.firestore.CollectionReference<firebase.firestore.DocumentData>;
  answers?: firebase.firestore.CollectionReference<firebase.firestore.DocumentData>;
  answers_count: number;
  date: number;
  images: CKEditorImagesState[];
}

export interface HelpForumDoc extends HelpForum {
  id: string;
}
