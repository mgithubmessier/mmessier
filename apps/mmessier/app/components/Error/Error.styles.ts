import { BasicStyle, Breakpoint, Style } from '@mmessier/types';
import { spacingLevel } from '../../styles/spacing';
import { colors } from '../../styles/colors';

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

export const basicStyles: BasicStyle = {
  sx: {
    alert: {
      backgroundColor: colors.background.main,
    },
  },
};
