import { Breakpoint, Style } from '@mmessier/types';
import { colors } from '../../../styles/colors';

export const styles: Style = (breakpoint: Breakpoint) => ({
  sx: {
    errorText: {
      color: colors.error,
    },
    selectField: {
      color: colors.text.main,
    },
  },
});
