import type { ErrorStatus } from 'openapi-typescript-helpers';

import { paths } from '@/@types/api-schema';
import { api } from '@/features/core';

enum ClientPublicStatus {
  INVALID_REQUEST = 400,
  UNAUTHORIZED = 401,
  SERVER_ERROR = 500,
}

export const getClientPublic = async (clientId: string) => {
  try {
    const { data } = await api.GET('/client/{clientId}/public', {
      params: { path: { clientId } },
    });

    return { data };
  } catch (err) {
    if (err instanceof Response) {
      const status = err.status as Extract<
        keyof paths['/client/{clientId}/public']['get']['responses'],
        ErrorStatus
      >;

      return {
        status:
          status in ClientPublicStatus
            ? (ClientPublicStatus[status] as keyof typeof ClientPublicStatus)
            : ('UNKNOWN_ERROR' as const),
      };
    }

    return {
      status: 'UNKNOWN_ERROR' as const,
    };
  }
};
