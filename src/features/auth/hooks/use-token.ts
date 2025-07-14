import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface TokenState {
  token: string | null | undefined;
  isSigningOut: boolean;
  saveToken: (token: string | null) => void;
  setSigningOut: (isSigningOut: boolean) => void;
}

const TOKEN_STORAGE_NAME = 'token';

export const useToken = create<TokenState>()(
  persist(
    (set) => ({
      token: undefined,
      isSigningOut: false,
      saveToken: (token) =>
        set((state) => ({
          ...state,
          token,
          isSigningOut: token === null,
        })),
      setSigningOut: (isSigningOut) =>
        set((state) => ({ ...state, isSigningOut })),
    }),
    { name: TOKEN_STORAGE_NAME },
  ),
);
