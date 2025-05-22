import type { ErrorStatus } from 'openapi-typescript-helpers';

import { paths } from '@/@types/api-schema';
import { api } from '@/features/core';

enum ClientPictureStatus {
  INVALID_TOKEN = 401,
  FORBIDDEN = 403,
  SERVER_ERROR = 500,
}

export const patchClientPicture = async (clientId: string, length: number) => {
  try {
    const { data } = await api.PATCH('/client/{clientId}/picture', {
      params: {
        path: { clientId },
        query: { length },
      },
    });

    return { data };
  } catch (err) {
    if (err instanceof Response) {
      const status = err.status as Extract<
        keyof paths['/client/{clientId}/picture']['patch']['responses'],
        ErrorStatus
      >;

      return {
        status:
          status in ClientPictureStatus
            ? (ClientPictureStatus[status] as keyof typeof ClientPictureStatus)
            : ('UNKNOWN_ERROR' as const),
      };
    }

    return {
      status: 'UNKNOWN_ERROR' as const,
    };
  }
};
