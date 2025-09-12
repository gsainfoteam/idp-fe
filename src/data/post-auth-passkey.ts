import type { ErrorStatus } from 'openapi-typescript-helpers';

import { paths } from '@/@types/api-schema';
import { api } from '@/features/core';

enum AuthPasskeyStatus {
  EMAIL_NOT_FOUND = 404,
  SERVER_ERROR = 500,
}

export const postAuthPasskey = async (
  requestBody: paths['/auth/passkey']['post']['requestBody']['content']['application/json'],
) => {
  try {
    const { data } = await api.POST('/auth/passkey', {
      body: requestBody,
    });

    return { data };
  } catch (err) {
    if (err instanceof Response) {
      const status = err.status as Extract<
        keyof paths['/auth/passkey']['post']['responses'],
        ErrorStatus
      >;

      return {
        status:
          status in AuthPasskeyStatus
            ? (AuthPasskeyStatus[status] as keyof typeof AuthPasskeyStatus)
            : ('UNKNOWN_ERROR' as const),
      };
    }

    return {
      status: 'UNKNOWN_ERROR' as const,
    };
  }
};
