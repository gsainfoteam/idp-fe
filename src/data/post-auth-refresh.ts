import type { ErrorStatus } from 'openapi-typescript-helpers';

import { paths } from '@/@types/api-schema';
import { api } from '@/features/core';

enum AuthRefreshStatus {
  SERVER_ERROR = 500,
}

export const postAuthRefresh = async () => {
  const { data, error, response } = await api.POST('/auth/refresh', {
    retry: true,
  });

  if (error || !data) {
    const status = response.status as Extract<
      keyof paths['/auth/login']['post']['responses'],
      ErrorStatus
    >;

    return {
      error,
      status: AuthRefreshStatus[status] as keyof typeof AuthRefreshStatus,
    };
  }

  return { data };
};
