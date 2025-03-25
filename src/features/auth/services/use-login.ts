import { useCallback } from 'react';

export const useLogin = () => {
  const login = useCallback(
    async ({ email, password }: { email: string; password: string }) => {
      console.log(email, password);
    },
    [],
  );

  return { login };
};
