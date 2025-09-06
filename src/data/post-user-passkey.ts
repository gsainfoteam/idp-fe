import type { ErrorStatus } from 'openapi-typescript-helpers';

import { paths } from '@/@types/api-schema';
import { api } from '@/features/core';

enum UserPasskeyStatus {
  EMAIL_NOT_FOUND = 404,
  SERVER_ERROR = 500,
}

export const postUserPasskey = async (
  requestBody: paths['/user/passkey']['post']['requestBody']['content']['application/json'],
) => {
  try {
    const { data } = await api.POST('/user/passkey', {
      body: requestBody,
    });

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
