import { colors } from '../styles/colors';
import { BasicStyle } from '../../types';

export const basicStyles: BasicStyle = {
  static: {
    link: {
      color: colors.text.main,
      textDecorationColor: colors.alternating[2].backgroundColor,
    },
    text: {
      color: colors.text.main,
    },
    ul: {
      marginTop: 0,
      marginBottom: 0,
    },
  },
};
