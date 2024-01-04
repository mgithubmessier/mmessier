import { Breakpoint, Style } from '@mmessier/types';
import { spacingLevel } from '../../../styles/spacing';

export const styles: Style = (breakpoint: Breakpoint) => ({
  static: {
    field: {
      marginBottom: spacingLevel(1, breakpoint),
    },
    formContainer: {
      display: 'flex',
      flexDirection: 'column',
      marginRight:
        breakpoint === Breakpoint.DEFAULT ? spacingLevel(4, breakpoint) : 0,
      marginBottom:
        breakpoint === Breakpoint.DEFAULT ? 0 : spacingLevel(4, breakpoint),
    },
    flexContainer: {
      display: 'flex',
      flexDirection: breakpoint === Breakpoint.DEFAULT ? 'row' : 'column',
    },
  },
});
