import type { ErrorStatus } from 'openapi-typescript-helpers';

import { paths } from '@/@types/api-schema';
import { api } from '@/features/core';

enum UserPictureStatus {
  INVALID_TOKEN = 401,
  SERVER_ERROR = 500,
}

export const patchUserPicture = async (
  length: paths['/user/picture']['patch']['parameters']['query']['length'],
) => {
  try {
    const { data } = await api.PATCH('/user/picture', {
      params: { query: { length } },
    });
    return { data };
  } catch (err) {
    if (err instanceof Response) {
      const status = err.status as Extract<
        keyof paths['/user/picture']['patch']['responses'],
        ErrorStatus
      >;

      return {
        status:
          status in UserPictureStatus
            ? (UserPictureStatus[status] as keyof typeof UserPictureStatus)
            : ('UNKNOWN_ERROR' as const),
      };
    }

    return {
      status: 'UNKNOWN_ERROR' as const,
    };
  }
};
