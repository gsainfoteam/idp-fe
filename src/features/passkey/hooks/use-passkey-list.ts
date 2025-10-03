import { $api } from '@/features/core';

export const usePasskeyList = () => {
  const { data, isLoading, error } = $api.useQuery('get', '/user/passkey');

  return {
    passkeys: data?.sort((a, b) => (a.name < b.name ? -1 : 1)),
    isLoading,
    error,
  };
};
