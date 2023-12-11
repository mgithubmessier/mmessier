import { BasicStyle } from '../../../types';
import { colors } from '../../styles/colors';
export const basicStyles: BasicStyle = {
  static: {
    container: {
      display: 'flex',
      flexDirection: 'column',
    },
    select: {
      minWidth: 300,
    },
    link: {
      color: colors.text.main,
      textDecorationColor: colors.alternating[2].backgroundColor,
      width: '100%',
    },
  },
  sx: {
    select: {
      color: colors.text.main,
    },
  },
};
