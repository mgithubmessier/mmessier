'use client';

import { Button } from '@mui/material';
import { useStyles } from '../../hooks/useStyles';
import { styles as errorStyles } from './Error.styles';

type ErrorClientProps = {
  children: React.ReactNode;
  reset?: () => void;
};

export const ErrorClient = ({ children, reset }: ErrorClientProps) => {
  const styles = useStyles(errorStyles);
  return (
    <div style={styles.static?.container}>
      {children}
      {reset ? (
        <Button
          style={styles.static?.button}
          variant="contained"
          onClick={reset}
        >
          Retry
        </Button>
      ) : null}
    </div>
  );
};
