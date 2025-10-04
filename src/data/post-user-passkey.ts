import { paths } from '@/@types/api-schema';
import { api } from '@/features/core';
import type { ErrorStatus } from 'openapi-typescript-helpers';

enum UserPasskeyStatus {
  EMAIL_NOT_FOUND = 404,
  SERVER_ERROR = 500,
}

export const postUserPasskey = async () => {
  try {
    const { data } = await api.POST('/user/passkey');

    return { data };
  } catch (err) {
    if (err instanceof Response) {
      const status = err.status as Extract<
        keyof paths['/user/passkey']['post']['responses'],
        ErrorStatus
      >;

      return {
        status:
          status in UserPasskeyStatus
            ? (UserPasskeyStatus[status] as keyof typeof UserPasskeyStatus)
            : ('UNKNOWN_ERROR' as const),
      };
    }

    return {
      status: 'UNKNOWN_ERROR' as const,
    };
  }
};
