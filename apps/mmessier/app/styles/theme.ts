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
    MuiTab: {
      styleOverrides: {
        selected: {
          color: colors.text.interactable,
        },
      },
    },
  },
  palette: {
    mode: 'light',
    primary: {
      main: colors.text.main,
    },
    secondary: {
      main: colors.text.main,
    },
  },
});
