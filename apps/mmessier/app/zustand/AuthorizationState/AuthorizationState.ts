import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export type AuthorizationState = {
  token: string | null;
  setToken: (token: string) => void;
};

export const useAuthorizationState = create<AuthorizationState>()(
  devtools((set) => {
    return {
      token: null,
      setToken: (token: string) => {
        return set({ token });
      },
    };
  })
);
