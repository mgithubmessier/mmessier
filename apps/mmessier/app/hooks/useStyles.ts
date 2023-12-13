'use client';

import { Style } from '@mmessier/types';
import { useBreakpointState } from '../zustand/BreakpointState/BreakpointState';

export const useStyles = (style: Style) => {
  const breakpointState = useBreakpointState();

  return style(breakpointState.currentBreakpoint);
};
