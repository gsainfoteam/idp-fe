import { useQuery } from '@tanstack/react-query';
import { useEffect, useMemo } from 'react';

import { getUser } from '../services/get-user';

import { useToken } from './use-token';

export const useAuth = () => {
  const { token } = useToken();
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['user'],
    queryFn: getUser,
    enabled: !!token,
  });

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
