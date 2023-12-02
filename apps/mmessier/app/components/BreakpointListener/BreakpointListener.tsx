'use client';

import { useEffect } from 'react';
import { useBreakpointState } from '../../zustand/BreakpointState/BreakpointState';
import { throttle } from 'lodash';

export const BreakpointListener = () => {
  const breakpointState = useBreakpointState();
  useEffect(() => {
    breakpointState.setBreakpoint(window.innerWidth);
    window.addEventListener(
      'resize',
      throttle(() => {
        breakpointState.setBreakpoint(window.innerWidth);
      }, 500)
    );
  }, []);

  return null;
};
