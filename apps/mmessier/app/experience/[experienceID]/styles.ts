import { Breakpoint, Style } from '../../../types';
import { colors } from '../../styles/colors';
import { spacingLevel } from '../../styles/spacing';

export const styles: Style = (breakpoint: Breakpoint) => ({
  dynamic: {
    accordion: (hasDetails: boolean, index: number) => {
      return {
        pointerEvents: hasDetails ? 'all' : 'none',
        ...colors.alternating[(index + 2) % colors.alternating.length],
        width: '100%',
      };
    },
  },
  static: {
    autocompleteField: {
      marginBottom: spacingLevel(2, breakpoint),
      paddingRight: 9,
    },
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
