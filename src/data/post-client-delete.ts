import type { ErrorStatus } from 'openapi-typescript-helpers';

import { paths } from '@/@types/api-schema';
import { api } from '@/features/core';

enum ClientDeleteStatus {
  INVALID_TOKEN = 401,
  INACCESSIBLE = 403,
  SERVER_ERROR = 500,
}

export const postClientDelete = async (clientId: string) => {
  try {
    await api.POST('/client/{clientId}/delete', {
      params: {
        path: { clientId },
      },
    });

    return {};
  } catch (err) {
    if (err instanceof Response) {
      const status = err.status as Extract<
        keyof paths['/client/{clientId}/delete']['post']['responses'],
        ErrorStatus
      >;

      return {
        status:
          status in ClientDeleteStatus
            ? (ClientDeleteStatus[status] as keyof typeof ClientDeleteStatus)
            : ('UNKNOWN_ERROR' as const),
      };
    }

    return {
      status: 'UNKNOWN_ERROR' as const,
    };
  }
};
