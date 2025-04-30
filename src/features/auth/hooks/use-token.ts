import { useCallback, useState } from 'react';

export const getToken = () => {
  return localStorage.getItem('token');
};

export const useToken = () => {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem('token'),
  );

  const saveToken = useCallback((token: string | null) => {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
    setToken(token);
  }, []);

  return { saveToken, token };
};
