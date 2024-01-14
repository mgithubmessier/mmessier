import { BasicStyle, Breakpoint, Style } from '@mmessier/types';
import { colors } from '../../../../styles/colors';
import { spacingLevel } from '../../../../styles/spacing';

export const basicStyles: BasicStyle = {
  static: {
    container: {
      display: 'flex',
      flexDirection: 'column',
    },
  },
};

export const styles: Style = (breakpoint: Breakpoint) => ({
  static: {
    text: {
      color: colors.text.main,
    },
    select: {
      minWidth: 300,
    },
    link: {
      color: colors.text.main,
      textDecorationColor: colors.alternating[2].backgroundColor,
      width: '100%',
    },
    selectContainer: {
      marginTop: spacingLevel(2, breakpoint),
    },
  },
  sx: {
    select: {
      color: colors.text.main,
    },
  },
});
