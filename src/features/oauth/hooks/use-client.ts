import { useQuery } from '@tanstack/react-query';
import { useEffect, useMemo } from 'react';

import { getClientPublic } from '@/data/get-client-public';

export const useClient = (clientId: string) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['client', clientId],
    queryFn: async () => {
      const { data, error } = await getClientPublic(clientId);
      if (error) throw error;
      return data;
    },
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

  return { client };
};
