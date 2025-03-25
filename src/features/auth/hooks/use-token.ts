import { useCallback, useEffect, useState } from 'react';

export const getToken = () => {
  return localStorage.getItem('token');
};

export const useToken = () => {
  const [token, setToken] = useState<string | null>(null);

  const saveToken = useCallback((token: string | null) => {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setToken(token);
  }, []);

  return { saveToken, token };
};
