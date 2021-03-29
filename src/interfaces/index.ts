import { NextApiRequest, NextApiResponse } from 'next/types';

export interface ErrorProps {
  err: any;
  req: NextApiRequest;
  res: NextApiResponse;
}

export interface StatusCode {
  statusCode: number;
}
