import type { ErrorStatus } from 'openapi-typescript-helpers';

import { paths } from '@/@types/api-schema';
import { api } from '@/features/core';

enum DeleteUserPictureStatus {
  INVALID_TOKEN = 401,
  SERVER_ERROR = 500,
}

export const deleteUserPicture = async () => {
  try {
    await api.DELETE('/user/picture');
    return {};
  } catch (err) {
    if (err instanceof Response) {
      const status = err.status as Extract<
        keyof paths['/user/picture']['delete']['responses'],
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
