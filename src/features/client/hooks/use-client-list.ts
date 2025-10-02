import { $api } from '@/features/core';

export const useClientList = () => {
  const { data, isLoading, error, refetch } = $api.useQuery('get', '/client');

  return {
    clients: data?.sort((a, b) => (a.name < b.name ? -1 : 1)),
    isLoading,
    error,
    refetch,
  };
};
