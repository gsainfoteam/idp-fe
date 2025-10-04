import { $api, sortByMulti } from '@/features/core';

export const useClientList = () => {
  const { data, isLoading, error, refetch } = $api.useQuery('get', '/client');

  return {
    clients: data
      ? sortByMulti(data, (e) => [e.deleteRequestedAt != null, e.name])
      : data,
    isLoading,
    error,
    refetch,
  };
};
