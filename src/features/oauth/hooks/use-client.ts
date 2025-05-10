import { useEffect, useMemo } from 'react';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

import { $api } from '@/features/core';

export const useClient = (clientId: string) => {
  const { t } = useTranslation();
  const { data, isLoading, error } = $api.useQuery(
    'get',
    '/client/{clientId}/public',
    { params: { path: { clientId } } },
    { enabled: !!clientId },
  );

  const client = useMemo(() => {
    if (isLoading) return undefined;
    if (error) return null;
    return data;
  }, [isLoading, error, data]);

  useEffect(() => {
    if (!isLoading && (error || client == null)) {
      toast.error(t('toast.fetch_error'));
    }
  }, [client, isLoading, error, t]);

  return { client };
};
