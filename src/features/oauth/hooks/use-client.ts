import { useQuery } from '@tanstack/react-query';
import { useEffect, useMemo } from 'react';

import { getClient } from '../services/get-client';

export const useClient = (clientId: string) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['client', clientId],
    queryFn: () => getClient(clientId),
    enabled: !!clientId,
  });

  const client = useMemo(() => {
    if (isLoading) return undefined;
    if (error) return null;
    return data;
  }, [isLoading, error, data]);

  useEffect(() => {
    if (!isLoading && (error || client == null)) {
      console.error('Error fetching client:', error); // TODO: error handling
    }
  }, [client, isLoading, error]);

  return { client, isLoading, error };
};
