import { useCallback, useEffect, useMemo } from 'react';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

import { useToken } from './use-token';

import { deleteAuthLogout } from '@/data/delete-auth-logout';
import { $api } from '@/features/core';

export const useAuth = () => {
  const { t } = useTranslation();
  const { token, saveToken } = useToken();
  const { data, isLoading, error, refetch } = $api.useQuery(
    'get',
    '/user',
    {},
    { enabled: !!token },
  );

  const user = useMemo(() => {
    if (!token) return null;
    if (isLoading) return undefined;
    if (error) return null;
    return data;
  }, [token, isLoading, error, data]);

  useEffect(() => {
    if (token) {
      refetch();
    }
  }, [refetch, token]);

  const signOut = useCallback(async () => {
    const { status } = await deleteAuthLogout();

    if (status) {
      switch (status) {
        case 'SERVER_ERROR':
          toast.error(t('toast.server_error'));
          break;
        case 'UNKNOWN_ERROR':
          toast.error(t('toast.unknown_error'));
          break;
      }

      return;
    }

    saveToken(null);
  }, [saveToken, t]);

  return { user, refetch, signOut };
};
