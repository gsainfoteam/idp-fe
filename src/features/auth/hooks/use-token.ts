import { createContext, useContext } from 'react';

type TokenContextType = {
  token: string | null;
  saveToken: (token: string | null) => void;
};

export const TokenContext = createContext<TokenContextType | null>(null);

export const useToken = () => {
  const context = useContext(TokenContext);
  if (!context) {
    throw new Error('useToken must be used within a TokenProvider');
  }
  return context;
};
