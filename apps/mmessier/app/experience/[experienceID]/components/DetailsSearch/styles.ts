import { spacingLevel } from '../../../../styles/spacing';
import { Breakpoint, Style } from '@mmessier/types';

export const styles: Style = (breakpoint: Breakpoint) => ({
  static: {
    autocompleteField: {
      marginBottom: spacingLevel(2, breakpoint),
      paddingRight: 9,
    },
  },
});
