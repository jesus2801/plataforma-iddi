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
}

type FirebaseDocReference = firebase.firestore.DocumentReference<firebase.firestore.DocumentData>;

interface ForumComment {
  author: FirebaseDocReference;
  comment: string;
  date: number;
}

interface ForumAsnwers {
  author: FirebaseDocReference;
  content: string;
  comments: ForumComment[];
  votes: string[];
  date: number;
}

export type ForumCategory =
  | 'art'
  | 'natural-sciences'
  | 'sports'
  | 'economy'
  | 'entr'
  | 'philosophy'
  | 'math'
  | 'technology'
  | 'society';

export interface HelpForum {
  author: FirebaseDocReference;
  title: string;
  content: string;
  category: ForumCategory;
  votes: string[];
  comments: ForumComment[];
  answers: ForumAsnwers[];
  date: number;
  images: CKEditorImagesState[];
}
