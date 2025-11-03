import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface TokenState {
  token: string | null | undefined;
  saveToken: (token: string | null | undefined) => void;
}

const TOKEN_STORAGE_NAME = 'token';

export const useToken = create<TokenState>()(
  persist(
    (set) => ({
      token: undefined,
      saveToken: (token) => set((state) => ({ ...state, token })),
    }),
    { name: TOKEN_STORAGE_NAME },
  ),
);
