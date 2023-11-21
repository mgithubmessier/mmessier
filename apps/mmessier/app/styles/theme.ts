'use client';

import { createTheme } from '@mui/material';
import { colors } from './colors';

export const theme = createTheme({
  typography: {
    allVariants: {
      color: colors.text.main,
    },
    h1: {
      '@media (min-width:600px)': {
        fontSize: '6rem',
      },
      fontSize: '3rem',
    },
    h2: {
      '@media (min-width:600px)': {
        fontSize: '3.75rem',
      },
      fontSize: '2rem',
    },
    h3: {
      '@media (min-width:600px)': {
        fontSize: '2.125rem',
      },
      fontSize: '1.75rem',
    },
    h4: {
      '@media (min-width:600px)': {
        fontSize: '2.125rem',
      },
      fontSize: '1.5rem',
    },
    h5: {
      '@media (min-width:600px)': {
        fontSize: '1.5rem',
      },
      fontSize: '1rem',
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: colors.background.secondary,
        },
      },
    },
  },
  palette: {
    mode: 'light',
    primary: {
      main: colors.components.main,
    },
  },
});
