'use client';

import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import breakpoints from '../../styles/breakpoints.module.scss';
// import { Experience } from '../../../types';
// import { Breakpoint } froxm '../../../types';

enum Breakpoint {
  SMALL = 'small',
  MEDIUM = 'medium',
  DEFAULT = 'default',
}

const small = Number(breakpoints[Breakpoint.SMALL]);
const medium = Number(breakpoints[Breakpoint.MEDIUM]);

export type BreakpointState = {
  currentBreakpoint: Breakpoint.SMALL | Breakpoint.MEDIUM | Breakpoint.DEFAULT;
  setBreakpoint: (width: number) => void;
};

export const useBreakpointState = create<BreakpointState>()(
  devtools((set) => ({
    currentBreakpoint: Breakpoint.DEFAULT,
    setBreakpoint: (width: number) => {
      if (width <= small) {
        return set({ currentBreakpoint: Breakpoint.SMALL });
      }
      if (width <= medium) {
        return set({ currentBreakpoint: Breakpoint.MEDIUM });
      }
      set({ currentBreakpoint: Breakpoint.DEFAULT });
    },
  }))
);
