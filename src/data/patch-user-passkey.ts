import { paths } from '@/@types/api-schema';
import { api } from '@/features/core';
import type { ErrorStatus } from 'openapi-typescript-helpers';

enum PatchUserPasskeyStatus {
  INVALID_TOKEN = 401,
  INVALID_USER = 403,
  INVALID_ID = 404,
  SERVER_ERROR = 500,
}

export const patchUserPasskey = async (
  id: string,
  requestBody: paths['/user/passkey/{id}']['patch']['requestBody']['content']['application/json'],
) => {
  try {
    const { data } = await api.PATCH('/user/passkey/{id}', {
      params: { path: { id } },
      body: requestBody,
    });

    return { data };
  } catch (err) {
    if (err instanceof Response) {
      const status = err.status as Extract<
        keyof paths['/user/passkey/{id}']['patch']['responses'],
        ErrorStatus
      >;

      return {
        status:
          status in PatchUserPasskeyStatus
            ? (PatchUserPasskeyStatus[
                status
              ] as keyof typeof PatchUserPasskeyStatus)
            : ('UNKNOWN_ERROR' as const),
      };
    }

    return {
      status: 'UNKNOWN_ERROR' as const,
    };
  }
};
