import type { ErrorStatus } from 'openapi-typescript-helpers';

import { paths } from '@/@types/api-schema';
import { api } from '@/features/core';

enum ClientStatus {
  DUPLICATED_CLIENT_ID = 409,
  SERVER_ERROR = 500,
}

export const postClient = async (
  requestBody: paths['/client']['post']['requestBody']['content']['application/json'],
) => {
  try {
    const { data } = await api.POST('/client', { body: requestBody });
    return { data };
  } catch (err) {
    if (err instanceof Response) {
      const status = err.status as Extract<
        keyof paths['/client']['post']['responses'],
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
