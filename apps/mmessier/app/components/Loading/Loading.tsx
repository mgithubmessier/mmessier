import { CircularProgress } from '@mui/material';

import { styles } from './Loading.styles';

export const Loading = () => {
  return (
    <div style={styles.container}>
      <CircularProgress style={styles.circularProgress} />
    </div>
  );
};

export default Loading;
