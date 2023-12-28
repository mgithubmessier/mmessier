import { NextRequest } from 'next/server';

export const getIPFromRequst = (req: NextRequest) => {
  return (req.headers.get('x-forwarded-for') ?? '127.0.0.1').split(',')[0];
};
