import { $api } from '@/features/core';

export function useConfirm() {
  const { data, isLoading, error } = $api.useQuery('get', '/user/consent');

  return {
    consents: data?.list,
    isLoading,
    error,
  };
}
