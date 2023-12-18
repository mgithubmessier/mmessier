import { Style } from '@mmessier/types';
import { fonts } from '../../styles/fonts';

export const styles: Style = () => ({
  static: {
    link: {
      ...fonts.h2Font.style,
      width: '100%',
      height: '100%',
      position: 'absolute',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      textDecoration: 'none',
      color: 'unset',
      textTransform: 'none',
      fontSize: '1.5rem',
    },
  },
});
