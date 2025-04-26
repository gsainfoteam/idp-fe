import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

import { getClient, GetClientResponse } from '../services/get-client';

export const useClient = (clientId: string) => {
  const {
    data: client,
    isLoading,
    error,
  } = useQuery<GetClientResponse>({
    queryKey: ['client', clientId],
    queryFn: () => getClient(clientId),
    enabled: !!clientId,
  });

  useEffect(() => {
    if (error || client == null) console.error('Error fetching client:', error); // TODO: error handling
  }, [error, client]);

  return { client: client!, isLoading, error };
};
