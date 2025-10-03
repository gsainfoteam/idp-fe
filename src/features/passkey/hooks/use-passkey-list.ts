import { $api } from '@/features/core';

export type Passkey = NonNullable<
  ReturnType<typeof usePasskeyList>['passkeys']
>[number];

export const usePasskeyList = () => {
  const { data, isLoading, error, refetch } = $api.useQuery(
    'get',
    '/user/passkey',
  );

  return {
    passkeys: data
      ? [...data].sort((a, b) => (a.name < b.name ? -1 : 1))
      : data,
    isLoading,
    error,
    refetch,
  };
};
