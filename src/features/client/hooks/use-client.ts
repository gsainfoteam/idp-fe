import { $api } from '@/features/core';

export const useClient = (id: string) => {
  const { data, isLoading, error } = $api.useQuery(
    'get',
    '/client/{clientId}',
    { params: { path: { clientId: id } } },
  );

  return { client: data, isLoading, error };
};
