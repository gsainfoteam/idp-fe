import { $api } from '@/features/core';

export const usePasskeyList = () => {
  const { data, isLoading, error } = $api.useQuery('get', '/user/passkey');

  return { passkeys: data, isLoading, error };
};
