import { Breakpoint, Style } from '@mmessier/types';

export const styles: Style = (breakpoint: Breakpoint) => ({
  static: {
    container: {
      display: 'flex',
      flexDirection: 'column',
    },
  },
});
