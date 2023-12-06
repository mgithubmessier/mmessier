'use client';
import { Breakpoint, Style } from '../types';
import { colors } from './styles/colors';
import { spacingLevel } from './styles/spacing';
import { h1MedeiaQueries } from './styles/theme';

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
    container: {
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      flex: 1,
      zIndex: 2,
    },
    platformIconContainer: {
      display: 'flex',
    },
  },
  sx: {
    platformIcon: {
      color: colors.text.main,
      ...h1MedeiaQueries,
    },
  },
});
