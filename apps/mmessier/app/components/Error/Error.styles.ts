import { Breakpoint, Style } from '@mmessier/types';
import { spacingLevel } from '../../styles/spacing';

export const styles: Style = (breakpoint: Breakpoint) => ({
  static: {
    container: {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      flex: 1,
    },
    button: {
      marginTop: spacingLevel(1, breakpoint),
    },
  },
});
