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
    },
  },
});
