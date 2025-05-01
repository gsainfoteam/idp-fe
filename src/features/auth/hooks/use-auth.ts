import { useEffect, useMemo } from 'react';

import { useToken } from './use-token';

import { $api } from '@/features/core';

export const useAuth = () => {
  const { token } = useToken();
  const { data, isLoading, error, refetch } = $api.useQuery('get', '/user');

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

  return { user, refetch };
};
