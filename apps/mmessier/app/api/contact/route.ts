import { configuration } from '../../../configuration';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (req: NextRequest) => {
  const body = await req.json();

  const response = await fetch(`${configuration.mmessierAPIHost}/contact`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json;charset=UTF-8',
      Authorization: req.headers.get('Authorization') || '',
    },
    body: JSON.stringify(body),
  });

  return NextResponse.json(await response.json(), {
    status: response.status,
  });
};
