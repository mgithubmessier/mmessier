import { configuration } from '../../../configuration';
import { NextResponse } from 'next/server';

export const POST = async () => {
  const response = await fetch(
    `${configuration.mmessierAPIHost}/authenticate`,
    {
      method: 'POST',
      headers: {
        'content-type': 'application/json;charset=UTF-8',
      },
    }
  );

  return NextResponse.json(await response.json(), {
    status: response.status,
  });
};
