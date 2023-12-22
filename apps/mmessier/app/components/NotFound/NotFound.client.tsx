'use client';

import { Help } from '@mui/icons-material';
import { useStyles } from '../../hooks/useStyles';

import { styles as notFoundStyles } from './NotFound.styles';

export const NotFoundClient = () => {
  const styles = useStyles(notFoundStyles);

  return (
    <div style={styles.static?.container}>
      <h2>
        <Help /> Page Not Found
      </h2>
    </div>
  );
};
