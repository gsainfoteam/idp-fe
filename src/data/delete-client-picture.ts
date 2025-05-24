import type { ErrorStatus } from 'openapi-typescript-helpers';

import { paths } from '@/@types/api-schema';
import { api } from '@/features/core';

enum DeleteUserPictureStatus {
  INVALID_TOKEN = 401,
  FORBIDDEN = 403,
  SERVER_ERROR = 500,
}

export const deleteClientPicture = async (clientId: string) => {
  try {
    await api.DELETE('/client/{clientId}/picture', {
      params: {
        path: { clientId },
      },
    });
    return {};
  } catch (err) {
    if (err instanceof Response) {
      const status = err.status as Extract<
        keyof paths['/client/{clientId}/picture']['delete']['responses'],
        ErrorStatus
      >;

      return {
        status:
          status in DeleteUserPictureStatus
            ? (DeleteUserPictureStatus[
                status
              ] as keyof typeof DeleteUserPictureStatus)
            : ('UNKNOWN_ERROR' as const),
      };
    }

    return {
      status: 'UNKNOWN_ERROR' as const,
    };
  }
};
