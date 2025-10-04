import { paths } from '@/@types/api-schema';
import { api } from '@/features/core';
import type { ErrorStatus } from 'openapi-typescript-helpers';

enum GetUserPasskeyStatus {
  UNAUTHORIZED = 401,
  SERVER_ERROR = 500,
}

export const getUserPasskey = async () => {
  try {
    const { data } = await api.GET('/user/passkey');

    return { data };
  } catch (err) {
    if (err instanceof Response) {
      const status = err.status as Extract<
        keyof paths['/user/passkey']['get']['responses'],
        ErrorStatus
      >;

      return {
        status:
          status in GetUserPasskeyStatus
            ? (GetUserPasskeyStatus[
                status
              ] as keyof typeof GetUserPasskeyStatus)
            : ('UNKNOWN_ERROR' as const),
      };
    }

    return {
      status: 'UNKNOWN_ERROR' as const,
    };
  }
};
