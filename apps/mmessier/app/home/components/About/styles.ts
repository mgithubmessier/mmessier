import { BasicStyle } from '@mmessier/types';
import { colors } from '../../../styles/colors';

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
    aboutContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    aboutTextContainer: {
      flex: 1,
    },
    sunbeamFont: {
      fontWeight: 1000,
    },
  },
};
