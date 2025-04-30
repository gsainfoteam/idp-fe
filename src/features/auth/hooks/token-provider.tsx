import { useCallback, useState } from 'react';

import { TokenContext } from './use-token';

export const TokenProvider = ({ children }: React.PropsWithChildren) => {
  const [token, setTokenState] = useState<string | null>(() => {
    return localStorage.getItem('token');
  });

  const saveToken = useCallback((newToken: string | null) => {
    if (newToken) {
      localStorage.setItem('token', newToken);
    } else {
      localStorage.removeItem('token');
    }
    setTokenState(newToken);
  }, []);

  return (
    <TokenContext.Provider value={{ token, saveToken }}>
      {children}
    </TokenContext.Provider>
  );
};
