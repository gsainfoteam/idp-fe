import { useCallback, useState } from 'react';

import { patchClientSecret } from '@/data/patch-client-secret';
import { $api } from '@/features/core';

export const useClient = (id: string) => {
  const { data, isLoading, error } = $api.useQuery(
    'get',
    '/client/{clientId}',
    { params: { path: { clientId: id } } },
  );
  const [clientSecret, setClientSecret] = useState<string>();
  const [isSecretLoading, setIsSecretLoading] = useState(false);

  const copyClientId = useCallback(() => {
    navigator.clipboard.writeText(data?.clientId ?? '');
  }, [data]);

  const regenerateClientSecret = useCallback(async () => {
    setIsSecretLoading(true);
    try {
      const { data } = await patchClientSecret(id);
      setClientSecret(data?.clientSecret);
    } finally {
      setIsSecretLoading(false);
    }
  }, [id]);

  const copyClientSecret = useCallback(() => {
    navigator.clipboard.writeText(clientSecret ?? '');
  }, [clientSecret]);

  return {
    client: data,
    clientSecret,
    isLoading,
    error,
    copyClientId,
    regenerateClientSecret,
    copyClientSecret,
    isSecretLoading,
  };
};
