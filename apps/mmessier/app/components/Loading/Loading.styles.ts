import { Style } from '../../../types';

export const styles: Style = () => ({
  static: {
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      flex: 1,
    },
    circularProgress: {
      width: 100,
      height: 100,
    },
  },
});
