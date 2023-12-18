import { colors } from 'apps/mmessier/app/styles/colors';
import { BasicStyle } from 'apps/mmessier/types';

export const styles: BasicStyle = {
  static: {
    container: {
      display: 'flex',
      flexDirection: 'column',
    },
    input: {
      color: colors.text.main,
    },
  },
};
