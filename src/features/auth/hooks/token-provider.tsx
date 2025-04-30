import { useCallback, useState } from 'react';

import { getToken, setToken, TokenContext } from './use-token';

export const TokenProvider = ({ children }: React.PropsWithChildren) => {
  const [token, setTokenState] = useState<string | null>(getToken);

  const saveToken = useCallback((newToken: string | null) => {
    setToken(newToken);
    setTokenState(newToken);
  }, []);

  return (
    <TokenContext.Provider value={{ token, saveToken }}>
      {children}
    </TokenContext.Provider>
  );
};
