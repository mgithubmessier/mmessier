'use client';
import { Breakpoint, Style } from '../types';
import { colors } from './styles/colors';
import { spacingLevel } from './styles/spacing';

export const styles: Style = (breakpoint: Breakpoint) => ({
  static: {
    body: {
      height: '100vh',
      margin: 0,
      marginLeft: 0,
      marginRight: 0,
      marginBottom: 0,
      padding: `0 ${spacingLevel(3, breakpoint)}px`,
      backgroundColor: colors.background.main,
    },
    childContainer: {
      flex: 1,
      display: 'flex',
      marginBottom: spacingLevel(3, breakpoint),
      padding: spacingLevel(3, breakpoint),
    },
    container: { display: 'flex', flexDirection: 'column', height: '100%' },
  },
});
