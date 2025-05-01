import { useCallback, useEffect, useMemo } from 'react';

import { useToken } from './use-token';

import { deleteAuthLogout } from '@/data/delete-auth-logout';
import { $api } from '@/features/core';

export const useAuth = () => {
  const { token, saveToken } = useToken();
  const { data, isLoading, error, refetch } = $api.useQuery(
    'get',
    '/user',
    {},
    { enabled: !!token },
  );

  const user = useMemo(() => {
    if (!token) return null;
    if (isLoading) return undefined;
    if (error) return null;
    return data;
  }, [token, isLoading, error, data]);

  useEffect(() => {
    if (token) {
      refetch();
    }
  }, [refetch, token]);

  const signOut = useCallback(async () => {
    await deleteAuthLogout();
    saveToken(null);
  }, [saveToken]);

  return { user, refetch, signOut };
};
