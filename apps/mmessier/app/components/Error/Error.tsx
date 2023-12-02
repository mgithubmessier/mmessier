import { Alert, Button, Typography } from '@mui/material';

import { ErrorContainer } from './Error.client';

type ErrorProps = {
  title: string;
  message: string;
  reset: () => void;
};

export const ErrorPage = ({ message, title, reset }: ErrorProps) => {
  return (
    <ErrorContainer>
      <Typography variant="h2">{title}</Typography>
      <Alert severity="error">{message}</Alert>
      <Button onClick={reset}>Retry</Button>
    </ErrorContainer>
  );
};
