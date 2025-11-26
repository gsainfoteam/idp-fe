import { useCallback, useEffect, useMemo } from 'react';

import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

import { deleteAuthLogout } from '@/data/auth';
import { $api, Log } from '@/features/core';

import { useToken } from './use-token';

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
    if (user) {
      Log.setUserId(user.uuid);
      Log.setUserProperties({
        email: user.email,
        name: user.name,
      });
    } else {
      Log.clearUserId();
    }
  }, [user]);

  useEffect(() => {
    if (token) {
      refetch();
    }
  }, [refetch, token]);

  const signOut = useCallback(
    async (shouldRedirect: boolean = true) => {
      const res = await deleteAuthLogout();

      if (!res.ok) {
        if (res.status === 500) {
          toast.error(t('toast.server_error'));
        } else {
          toast.error(t('toast.unknown_error'));
        }
        return;
      }

      saveToken(shouldRedirect ? null : undefined);
    },
    [saveToken, t],
  );

  return { user, refetch, signOut };
};
