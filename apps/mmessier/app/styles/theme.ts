'use client';

import { createTheme } from '@mui/material';
import { colors } from './colors';
import { fonts } from './fonts';

export const theme = createTheme({
  typography: {
    h1: {
      color: colors.text.main,
      ...fonts.h1Font.style,
      fontSize: '3rem',
      '@media (min-width:400px)': {
        fontSize: '4rem',
      },
      '@media (min-width:600px)': {
        fontSize: '6rem',
      },
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
