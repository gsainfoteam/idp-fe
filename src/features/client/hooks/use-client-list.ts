import { $api } from '@/features/core';

export const useClientList = () => {
  const { data, isLoading, error, refetch } = $api.useQuery('get', '/client');

  return { clients: data, isLoading, error, refetch };
};
