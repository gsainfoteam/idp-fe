import { $api } from '@/features/core';

export type Client = NonNullable<ReturnType<typeof useClient>['client']>;

export const useClient = (id: string) => {
  const { data, isLoading, error } = $api.useQuery(
    'get',
    '/client/{clientId}',
    { params: { path: { clientId: id } } },
  );

  return { client: data, isLoading, error };
};
