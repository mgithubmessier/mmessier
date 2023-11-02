import { CSSProperties } from 'react';

export const colors = {
  alternating: {
    0: {
      backgroundColor: '#3F0D12',
      color: '#FFFFFF',
    },
    1: {
      backgroundColor: '#A7CAB1',
      color: '#000000',
    },
    2: {
      backgroundColor: '#F55D3E',
      color: '#000000',
    },
    3: {
      backgroundColor: '#41521F',
      color: '#FFFFFF',
    },
  } as { [x: number]: CSSProperties },
  text: {
    main: '#FFFFFF',
  },
  components: {
    main: '#FFFFFF',
  },
  background: {
    main: '#27475b',
    secondary: '#446e87',
  },
};
