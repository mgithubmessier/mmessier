'use client';

import { createTheme } from '@mui/material';
import { colors } from './colors';
import {
  fonts,
  h1MediaQueries,
  h2MediaQueries,
  h3MediaQueries,
  h4MediaQueries,
} from './fonts';

export const theme = createTheme({
  typography: {
    allVariants: {
      ...fonts.common.style,
    },
    h1: {
      color: colors.text.main,
      ...fonts.h1Font.style,
      ...h1MediaQueries,
    },
    h2: {
      color: colors.text.main,
      ...fonts.h2Font.style,
      ...h2MediaQueries,
    },
    h3: {
      color: colors.text.main,
      ...fonts.h3Font.style,
      ...h3MediaQueries,
    },
    h4: {
      color: colors.text.main,
      ...fonts.h4Font.style,
      ...h4MediaQueries,
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(92, 107, 192, 0.8)',
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
