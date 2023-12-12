import { colors } from '../../../styles/colors';
import { BasicStyle } from '../../../../types';
export const basicStyles: BasicStyle = {
  static: {
    container: {
      display: 'flex',
      flexDirection: 'column',
    },
    select: {
      width: '100%',
    },
    selectContainer: {
      marginTop: 12,
      width: '100%',
    },
    text: {
      color: colors.text.main,
    },
  },
};
