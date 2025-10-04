import { $api, sortBy } from '@/features/core';

export type Passkey = NonNullable<
  ReturnType<typeof usePasskeyList>['passkeys']
>[number];

export const usePasskeyList = () => {
  const { data, isLoading, error, refetch } = $api.useQuery(
    'get',
    '/user/passkey',
  );

  return {
    passkeys: data ? sortBy(data, (e) => e.name) : data,
    isLoading,
    error,
    refetch,
  };
};
