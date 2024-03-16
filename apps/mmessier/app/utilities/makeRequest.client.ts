'use client';
import { BaseResponse } from '@mmessier/types';

import {
  useSnackbarState,
  SetOpenParameters,
} from '../zustand/SnackbarState/SnackbarState';

type MakeRequestParams = {
  url: string;
  body?: object;
  authorization?: string;
  method: 'GET' | 'POST' | 'PATCH' | 'DELETE';
  success?: SetOpenParameters;
  failure: SetOpenParameters;
};

export async function makeRequest<T extends BaseResponse>({
  url,
  authorization,
  body,
  failure,
  success,
  method,
}: MakeRequestParams): Promise<T | null> {
  try {
    const params: RequestInit = {
      method,
      headers: {},
    };
    if (authorization) {
      params.headers = {
        authorization,
      };
    }
    if (body) {
      params.body = JSON.stringify(body);
    }
    const response = await fetch(url, params);

    if (!response.ok) {
      const responseBody = await response.json();
      if (responseBody?.error) {
        throw new Error(responseBody.error);
      }
      throw new Error(
        `Encountered error making request: ${url} - ${response.status}`
      );
    }
    if (success) {
      useSnackbarState.getState().setOpen(success);
    }
    return response.json();
  } catch (e) {
    console.error(
      `Encountered error making request: ${url} - ${JSON.stringify(e, null, 2)}`
    );
    useSnackbarState.getState().setOpen(failure);
  }
  return null;
}
