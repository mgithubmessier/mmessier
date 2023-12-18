import { Breakpoint, Style } from '@mmessier/types';
import { spacingLevel } from '../../../styles/spacing';

export const styles: Style = (breakpoint: Breakpoint) => ({
  dynamic: {},
  static: {
    container: {
      marginTop: spacingLevel(2, breakpoint),
    },
    inputContainer: {
      marginBottom: spacingLevel(1, breakpoint),
    },
    button: {
      marginTop: spacingLevel(2, breakpoint),
    },
  },
});
