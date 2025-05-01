import { useEffect, useMemo } from 'react';

import { $api } from '@/features/core';

export const useClient = (clientId: string) => {
  const { data, isLoading, error } = $api.useQuery(
    'get',
    '/client/{clientId}/public',
    { params: { path: { clientId } } },
    { enabled: !!clientId },
  );

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
