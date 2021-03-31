import { NextApiRequest, NextApiResponse } from 'next/types';
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
