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
      keepToken: true,
    });

    return { data };
  } catch (err) {
    if (err instanceof Response) {
      const status = err.status as Extract<
        keyof paths['/auth/refresh']['post']['responses'],
        ErrorStatus
      >;

      return {
        status:
          status in AuthRefreshStatus
            ? (AuthRefreshStatus[status] as keyof typeof AuthRefreshStatus)
            : ('UNKNOWN_ERROR' as const),
      };
    }

    return {
      status: 'UNKNOWN_ERROR' as const,
    };
  }
};
