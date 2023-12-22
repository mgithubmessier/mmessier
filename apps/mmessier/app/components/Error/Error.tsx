import { Alert, Typography } from '@mui/material';

import { ErrorClient } from './Error.client';

type ErrorProps = {
  title: string;
  message: string;
  reset?: () => void;
};

export const ErrorPage = ({ message, title, reset }: ErrorProps) => {
  return (
    <ErrorClient reset={reset}>
      <Typography variant="h2">{title}</Typography>
      <Alert severity="error">{message}</Alert>
    </ErrorClient>
  );
};
