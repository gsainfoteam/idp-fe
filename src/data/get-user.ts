import type { ErrorStatus } from 'openapi-typescript-helpers';

import { paths } from '@/@types/api-schema';
import { api } from '@/features/core';

enum UserStatus {
  UNAUTHORIZED = 401,
  SERVER_ERROR = 500,
}

export const getUser = async () => {
  try {
    const { data } = await api.GET('/user');

    return { data };
  } catch (err) {
    if (err instanceof Response) {
      const status = err.status as Extract<
        keyof paths['/user']['get']['responses'],
        ErrorStatus
      >;

      return {
        status:
          status in UserStatus
            ? (UserStatus[status] as keyof typeof UserStatus)
            : ('UNKNOWN_ERROR' as const),
      };
    }

    return {
      status: 'UNKNOWN_ERROR' as const,
    };
  }
};
