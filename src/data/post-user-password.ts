import type { ErrorStatus } from 'openapi-typescript-helpers';

import { paths } from '@/@types/api-schema';
import { api } from '@/features/core';

enum ClientStatus {
  INVALID_BODY = 400,
  INVALID_EMAIL = 403,
  SERVER_ERROR = 500,
}

export const postUserPassword = async (
  requestBody: paths['/user/password']['post']['requestBody']['content']['application/json'],
) => {
  try {
    await api.POST('/user/password', {
      body: requestBody,
    });
    return {};
  } catch (err) {
    if (err instanceof Response) {
      const status = err.status as Extract<
        keyof paths['/user/password']['post']['responses'],
        ErrorStatus
      >;

      return {
        status:
          status in ClientStatus
            ? (ClientStatus[status] as keyof typeof ClientStatus)
            : ('UNKNOWN_ERROR' as const),
      };
    }

    return {
      status: 'UNKNOWN_ERROR' as const,
    };
  }
};
