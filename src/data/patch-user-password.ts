import type { ErrorStatus } from 'openapi-typescript-helpers';

import { paths } from '@/@types/api-schema';
import { api } from '@/features/core';

enum ClientStatus {
  INVALID_TOKEN = 403,
  SERVER_ERROR = 500,
}

export const patchUserPassword = async (
  requestBody: paths['/user/password']['patch']['requestBody']['content']['application/json'],
) => {
  try {
    const { data } = await api.PATCH('/user/password', {
      body: requestBody,
    });

    return { data };
  } catch (err) {
    if (err instanceof Response) {
      const status = err.status as Extract<
        keyof paths['/user/password']['patch']['responses'],
        ErrorStatus
      >;

      return {
        status: ClientStatus[status] as keyof typeof ClientStatus,
      };
    }

    return {
      status: 'UNKNOWN_ERROR' as const,
    };
  }
};
