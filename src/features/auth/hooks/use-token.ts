import { createContext, useContext } from 'react';

type TokenContextType = {
  token: string | null;
  saveToken: (token: string | null) => void;
};

const TOKEN_STORAGE_NAME = 'token';

export const TokenContext = createContext<TokenContextType | null>(null);

export const useToken = () => {
  const context = useContext(TokenContext);
  if (!context) {
    throw new Error('useToken must be used within a TokenProvider');
  }
  return context;
};

export const getToken = () => {
  return localStorage.getItem(TOKEN_STORAGE_NAME);
};

export const setToken = (token: string | null) => {
  if (token) {
    localStorage.setItem(TOKEN_STORAGE_NAME, token);
  } else {
    localStorage.removeItem(TOKEN_STORAGE_NAME);
  }
};
