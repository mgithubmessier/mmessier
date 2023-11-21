'use client';

import { createTheme } from '@mui/material';
import { colors } from './colors';
import { fonts } from './fonts';

export const theme = createTheme({
  typography: {
    h1: {
      color: colors.text.main,
      ...fonts.h1Font.style,
      src: "url('/fonts/Montserrat/Montserrat-VariableFont_wght.ttf')",
      '@media (min-width:600px)': {
        fontSize: '6rem',
      },
      fontSize: '4rem',
    },
    h2: {
      color: colors.text.main,
      ...fonts.h2Font.style,
      '@media (min-width:600px)': {
        fontSize: '4rem',
      },
      fontSize: '3rem',
    },
    h3: {
      color: colors.text.main,
      ...fonts.h3Font.style,
      '@media (min-width:600px)': {
        fontSize: '2.5rem',
      },
      fontSize: '2rem',
    },
    h4: {
      color: colors.text.main,
      ...fonts.h4Font.style,
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
