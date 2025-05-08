import type { ErrorStatus } from 'openapi-typescript-helpers';

import { paths } from '@/@types/api-schema';
import { api } from '@/features/core';

enum AuthLogoutStatus {
  SERVER_ERROR = 500,
}

export const deleteAuthLogout = async () => {
  try {
    const { data } = await api.DELETE('/auth/logout');

    return { data };
  } catch (err) {
    if (err instanceof Response) {
      const status = err.status as Extract<
        keyof paths['/auth/logout']['delete']['responses'],
        ErrorStatus
      >;

      return {
        status: AuthLogoutStatus[status] as keyof typeof AuthLogoutStatus,
      };
    }

    return {
      status: 'UNKNOWN_ERROR' as const,
    };
  }
};
