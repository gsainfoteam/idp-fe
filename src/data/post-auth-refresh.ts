import type { ErrorStatus } from 'openapi-typescript-helpers';

import { paths } from '@/@types/api-schema';
import { api } from '@/features/core';

enum AuthRefreshStatus {
  SERVER_ERROR = 500,
}

export const postAuthRefresh = async () => {
  try {
    const { data } = await api.POST('/auth/refresh', {
      retry: true,
    });

    return { data };
  } catch (err) {
    const status = (err as Response).status as Extract<
      keyof paths['/auth/refresh']['post']['responses'],
      ErrorStatus
    >;

    return {
      status: AuthRefreshStatus[status] as keyof typeof AuthRefreshStatus,
    };
  }
};
