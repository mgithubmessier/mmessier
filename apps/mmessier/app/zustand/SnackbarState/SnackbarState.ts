import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

type Variant = 'error' | 'warning' | 'success' | 'info' | null;

export type SnackbarState = {
  open: boolean;
  message: string;
  variant?: Variant;
  setOpen: (params: SetOpenParameters) => void;
};

type SetOpenParameters = {
  timeoutMS: number;
  message: string;
  variant?: Variant;
};

const initialSnackbarState: SnackbarState = {
  open: false,
  message: '',
  setOpen: (s: SetOpenParameters) => {},
};

let snackbarTimeout: NodeJS.Timeout | null = null;

export const useSnackbarState = create<SnackbarState>()(
  devtools((set) => {
    return {
      ...initialSnackbarState,
      setOpen: ({ timeoutMS, message, variant }: SetOpenParameters) => {
        if (snackbarTimeout) {
          clearTimeout(snackbarTimeout);
        }
        snackbarTimeout = setTimeout(() => {
          set(initialSnackbarState);
        }, timeoutMS);
        return set({ open: true, message, variant });
      },
    };
  })
);
