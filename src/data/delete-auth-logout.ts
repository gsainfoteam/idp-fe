import type { ErrorStatus } from 'openapi-typescript-helpers';

import { paths } from '@/@types/api-schema';
import { api } from '@/features/core';

enum AuthLogoutStatus {
  SERVER_ERROR = 500,
}

export const deleteAuthLogout = async () => {
  try {
    await api.DELETE('/auth/logout');
    return {};
  } catch (err) {
    if (err instanceof Response) {
      const status = err.status as Extract<
        keyof paths['/auth/logout']['delete']['responses'],
        ErrorStatus
      >;

      return {
        status:
          status in AuthLogoutStatus
            ? (AuthLogoutStatus[status] as keyof typeof AuthLogoutStatus)
            : ('UNKNOWN_ERROR' as const),
      };
    }

    return {
      status: 'UNKNOWN_ERROR' as const,
    };
  }
};
