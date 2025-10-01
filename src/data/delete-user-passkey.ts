import { paths } from '@/@types/api-schema';
import { api } from '@/features/core';
import type { ErrorStatus } from 'openapi-typescript-helpers';

enum DeleteUserPasskeyStatus {
  INVALID_TOKEN = 401,
  INVALID_PASSWORD = 403,
  INVALID_ID = 404,
  SERVER_ERROR = 500,
}

export const deleteUserPasskey = async (id: string) => {
  try {
    await api.DELETE('/user/passkey/{id}', {
      params: { path: { id } },
    });

    return {};
  } catch (err) {
    if (err instanceof Response) {
      const status = err.status as Extract<
        keyof paths['/user/passkey/{id}']['delete']['responses'],
        ErrorStatus
      >;

      return {
        status:
          status in DeleteUserPasskeyStatus
            ? (DeleteUserPasskeyStatus[
                status
              ] as keyof typeof DeleteUserPasskeyStatus)
            : ('UNKNOWN_ERROR' as const),
      };
    }

    return {
      status: 'UNKNOWN_ERROR' as const,
    };
  }
};
