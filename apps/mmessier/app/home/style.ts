import { BasicStyle } from '../../types';
import { colors } from '../styles/colors';

export const basicStyles: BasicStyle = {
  static: {
    container: {
      width: '100%',
      height: '100%',
    },
    text: {
      color: colors.text.main,
    },
    link: {
      color: colors.text.main,
      textDecorationColor: colors.alternating[2].backgroundColor,
    },
  },
};
