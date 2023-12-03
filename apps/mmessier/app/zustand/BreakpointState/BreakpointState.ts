'use client';

import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import breakpoints from '../../styles/breakpoints.module.scss';

enum Breakpoint {
  SMALL = 'small',
  MEDIUM = 'medium',
  DEFAULT = 'default',
}

const small = Number(breakpoints[Breakpoint.SMALL]);
const medium = Number(breakpoints[Breakpoint.MEDIUM]);

export type BreakpointState = {
  currentBreakpoint: Breakpoint.SMALL | Breakpoint.MEDIUM | Breakpoint.DEFAULT;
  setBreakpoint: (currentBreakpoint: Breakpoint, width: number) => void;
};

export const useBreakpointState = create<BreakpointState>()(
  devtools((set) => ({
    currentBreakpoint: Breakpoint.DEFAULT,
    setBreakpoint: (currentBreakpoint: Breakpoint, width: number) => {
      if (width <= small) {
        if (currentBreakpoint !== Breakpoint.SMALL) {
          return set({ currentBreakpoint: Breakpoint.SMALL });
        }
        return;
      }
      if (width <= medium) {
        if (currentBreakpoint !== Breakpoint.MEDIUM) {
          return set({ currentBreakpoint: Breakpoint.MEDIUM });
        }
        return;
      }

      if (width > medium) {
        if (currentBreakpoint !== Breakpoint.DEFAULT) {
          return set({ currentBreakpoint: Breakpoint.DEFAULT });
        }
        return;
      }
    },
  }))
);
