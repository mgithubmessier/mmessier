import { colors } from '../../../styles/colors';
import { Breakpoint, Style } from '../../../../types';
import { spacingLevel } from '../../../styles/spacing';
export const styles: Style = (breakpoint: Breakpoint) => ({
  static: {
    container: {
      display: 'flex',
      flexDirection: 'column',
    },
    select: {
      width: '100%',
    },
    selectContainer: {
      marginTop: spacingLevel(1, breakpoint),
      width: '100%',
    },
    text: {
      color: colors.text.main,
    },
  },
});
