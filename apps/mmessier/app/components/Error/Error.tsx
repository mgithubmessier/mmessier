import { Alert, Typography } from '@mui/material';

import { ErrorClient } from './Error.client';
import { basicStyles } from './Error.styles';

type ErrorProps = {
  title: string;
  message: string;
  reset?: () => void;
};

export const ErrorPage = ({ message, title, reset }: ErrorProps) => {
  return (
    <ErrorClient reset={reset}>
      <Typography variant="h2">{title}</Typography>
      <Alert sx={basicStyles.sx?.alert} severity="error">
        {message}
      </Alert>
    </ErrorClient>
  );
};
