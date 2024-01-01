import { headers } from 'next/headers';
import { NextRequest } from 'next/server';

export const getClientIPAddress = () => {
  return process.env.NODE_ENV === 'development'
    ? '121.0.0.1'
    : headers().get('x-forwarded-for') || '';
};

export const getRequestIPAddress = (req: NextRequest) => {
  return process.env.NODE_ENV === 'development'
    ? '121.0.0.1'
    : req.headers.get('x-forwarded-for') || '';
};
