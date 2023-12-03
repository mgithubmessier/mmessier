'use client';

import { useEffect } from 'react';
import { useBreakpointState } from '../../zustand/BreakpointState/BreakpointState';
import { throttle } from 'lodash';

export const BreakpointListener = () => {
  const breakpointState = useBreakpointState();
  useEffect(() => {
    breakpointState.setBreakpoint(
      breakpointState.currentBreakpoint,
      window.innerWidth
    );
    const listener = throttle(() => {
      breakpointState.setBreakpoint(
        breakpointState.currentBreakpoint,
        window.innerWidth
      );
    }, 500);
    window.addEventListener('resize', listener);
    return () => {
      window.removeEventListener('resize', listener);
    };
  }, [breakpointState.currentBreakpoint]);

  return null;
};
