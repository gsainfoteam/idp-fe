import { useMemo } from 'react';

import { $api } from '@/features/core';

export const useConsentedScopes = (clientId: string) => {
  const { data, isLoading, error } = $api.useQuery('get', '/user/consent');
  const scopes = useMemo(() => {
    return data?.list.find((c) => c.clientUuid === clientId)?.scopes ?? [];
  }, [data, clientId]);

  return { scopes, isLoading, error };
};
