'use client';

import { Help } from '@mui/icons-material';
import { useStyles } from '../../hooks/useStyles';

import { styles as notFoundStyles } from './NotFound.styles';

type NotFoundClientProps = {
  title?: string;
};

export const NotFoundClient = ({
  title = 'Page Not Found',
}: NotFoundClientProps) => {
  const styles = useStyles(notFoundStyles);

  return (
    <div style={styles.static?.container}>
      <h2>
        <Help /> {title}
      </h2>
    </div>
  );
};
