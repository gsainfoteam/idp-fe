import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

import { getUser } from '../services/get-user';

import { useToken } from './use-token';

export const useAuth = () => {
  const { token } = useToken();
  const { data, isLoading, error } = useQuery({
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

  return { user };
};
