import { paths } from '@/@types/api-schema';
import { api } from '@/features/core';
import type { ErrorStatus } from 'openapi-typescript-helpers';

enum UserEmailStatus {
  SERVER_ERROR = 500,
}

export const getUserEmail = async (email: string) => {
  try {
    const { data } = await api.GET('/user/email/{email}', {
      params: { path: { email } },
    });

    return { data };
  } catch (err) {
    if (err instanceof Response) {
      const status = err.status as Extract<
        keyof paths['/user/email/{email}']['get']['responses'],
        ErrorStatus
      >;

      return {
        status:
          status in UserEmailStatus
            ? (UserEmailStatus[status] as keyof typeof UserEmailStatus)
            : ('UNKNOWN_ERROR' as const),
      };
    }

    return {
      status: 'UNKNOWN_ERROR' as const,
    };
  }
};
