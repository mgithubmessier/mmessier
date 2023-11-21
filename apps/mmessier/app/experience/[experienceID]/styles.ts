import { Style } from '../../../types';
import { colors } from '../../styles/colors';
import { fonts } from '../../styles/fonts';
import { spacingLevel } from '../../styles/spacing';

export const styles: Style = {
  dynamic: {
    accordion: (hasDetails: boolean, index: number) => {
      return {
        pointerEvents: hasDetails ? 'all' : 'none',
        ...colors.alternating[(index + 1) % colors.alternating.length],
        width: '100%',
      };
    },
  },
  static: {
    container: {
      display: 'flex',
      flexDirection: 'column',
      flex: 1,
    },
    titleContainer: {
      display: 'flex',
      flexDirection: 'column',
      paddingBottom: spacingLevel(2),
    },
    detailText: {
      ...fonts.common.style,
      fontSize: '1.2rem',
    },
  },
};
