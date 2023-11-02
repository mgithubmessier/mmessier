'use client';

import { createTheme } from '@mui/material';
import { colors } from './colors';

export const theme = createTheme({
  typography: {
    allVariants: {
      color: colors.text.main,
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
