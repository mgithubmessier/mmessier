'use client';

import { Breakpoint, Style } from '../../../../../types';
import { colors } from '../../../../styles/colors';

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
});
