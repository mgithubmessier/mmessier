import { colors } from '../../../styles/colors';
import { Breakpoint, Style } from '@mmessier/types';
import { spacingLevel } from '../../../styles/spacing';

export const styles: Style = (breakpoint: Breakpoint) => ({
  static: {
    container: {
      display: 'flex',
      flexDirection: 'column',
      marginTop: spacingLevel(2, breakpoint),
    },
    select: {
      width: '100%',
    },
    inputContainer: {
      marginTop: spacingLevel(2, breakpoint),
      width: '100%',
    },
    text: {
      color: colors.text.main,
    },
  },
});
