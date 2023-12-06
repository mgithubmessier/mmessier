'use client';

import { createTheme } from '@mui/material';
import { colors } from './colors';
import { fonts } from './fonts';

export const h1MedeiaQueries = {
  fontSize: '3rem',
  '@media (min-width:400px)': {
    fontSize: '4rem',
  },
  '@media (min-width:600px)': {
    fontSize: '6rem',
  },
};

export const theme = createTheme({
  typography: {
    allVariants: {
      ...fonts.common.style,
    },
    h1: {
      color: colors.text.main,
      ...fonts.h1Font.style,
      ...h1MedeiaQueries,
    },
    h2: {
      color: colors.text.main,
      ...fonts.h2Font.style,
      fontSize: '2rem',
      '@media (min-width:400px)': {
        fontSize: '3rem',
      },
      '@media (min-width:600px)': {
        fontSize: '4rem',
      },
    },
    h3: {
      color: colors.text.main,
      ...fonts.h3Font.style,
      fontSize: '1.5rem',
      '@media (min-width:400px)': {
        fontSize: '2rem',
      },
      '@media (min-width:600px)': {
        fontSize: '2.5rem',
      },
    },
    h4: {
      color: colors.text.main,
      ...fonts.h4Font.style,
      fontSize: '1rem',
      '@media (min-width:400px)': {
        fontSize: '1.25rem',
      },
      '@media (min-width:600px)': {
        fontSize: '1.5rem',
      },
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(92, 107, 192, 0.7)',
        },
      },
    },
  },
  palette: {
    mode: 'light',
    primary: {
      main: colors.components.main,
    },
    error: {
      main: colors.error,
    },
  },
});
