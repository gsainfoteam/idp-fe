import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface TokenState {
  token: string | null;
  saveToken: (token: string | null) => void;
}

const TOKEN_STORAGE_NAME = 'token';

export const useToken = create<TokenState>()(
  persist(
    (set) => ({
      token: null,
      saveToken: (token) =>
        set((state) => {
          console.log('saveToken', token); // FIXME: debug
          return { ...state, token };
        }),
    }),
    { name: TOKEN_STORAGE_NAME },
  ),
);
