import { Breakpoint, Style } from '../../../types';
import { colors } from '../../styles/colors';
import { spacingLevel } from '../../styles/spacing';

export const styles: Style = (breakpoint: Breakpoint) => ({
  static: {
    companyURL: {
      textDecorationColor: colors.alternating[2].backgroundColor,
    },
    container: {
      display: 'flex',
      flexDirection: 'column',
      flex: 1,
    },
    titleContainer: {
      display: 'flex',
      flexDirection: 'column',
      paddingBottom: spacingLevel(2, breakpoint),
    },
    detailText: {
      fontSize: '1.2rem',
    },
  },
});
