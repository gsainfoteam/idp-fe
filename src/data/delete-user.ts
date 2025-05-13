import type { ErrorStatus } from 'openapi-typescript-helpers';

import { paths } from '@/@types/api-schema';
import { api } from '@/features/core';

enum DeleteUserStatus {
  INVALID_PASSWORD = 403,
  SERVER_ERROR = 500,
}

export const deleteUser = async ({ password }: { password: string }) => {
  try {
    await api.DELETE('/user', { body: { password } });
    return {};
  } catch (err) {
    if (err instanceof Response) {
      const status = err.status as Extract<
        keyof paths['/user']['delete']['responses'],
        ErrorStatus
      >;

      return {
        status:
          status in DeleteUserStatus
            ? (DeleteUserStatus[status] as keyof typeof DeleteUserStatus)
            : ('UNKNOWN_ERROR' as const),
      };
    }

    return {
      status: 'UNKNOWN_ERROR' as const,
    };
  }
};
