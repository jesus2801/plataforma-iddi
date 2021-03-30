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
