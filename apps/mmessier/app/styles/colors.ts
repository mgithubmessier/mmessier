import { CSSProperties } from 'react';
import { indigo } from '@mui/material/colors';

const MAIN_COLOR = indigo;

export const colors = {
  alternating: {
    0: {
      backgroundColor: MAIN_COLOR[900],
      color: '#FFFFFF',
    },
    1: {
      backgroundColor: MAIN_COLOR[800],
      color: '#FFFFFF',
    },
    2: {
      backgroundColor: MAIN_COLOR[700],
      color: '#FFFFFF',
    },
    3: {
      backgroundColor: MAIN_COLOR[600],
      color: '#FFFFFF',
    },
  } as { [x: number]: CSSProperties },
  text: {
    main: MAIN_COLOR[50],
  },
  components: {
    main: MAIN_COLOR[50],
  },
  background: {
    main: MAIN_COLOR[500],
    secondary: MAIN_COLOR[400],
    tertiary: MAIN_COLOR[300],
  },
};
