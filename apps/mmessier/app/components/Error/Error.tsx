import { Alert, Button, Typography } from '@mui/material';

import { styles } from './Error.styles';

type ErrorProps = {
  title: string;
  message: string;
  reset: () => void;
};

export const ErrorPage = ({ message, title, reset }: ErrorProps) => {
  return (
    <div style={styles.container}>
      <Typography>{title}</Typography>
      <Alert severity="error">{message}</Alert>
      <Button onClick={reset}>Retry</Button>
    </div>
  );
};
