import type { ErrorStatus } from 'openapi-typescript-helpers';

import { paths } from '@/@types/api-schema';
import { api } from '@/features/core';

enum UserStatus {
  UNAUTHORIZED = 401,
  SERVER_ERROR = 500,
}

export const getUser = async () => {
  const { data, error, response } = await api.GET('/user');

  if (error || !data) {
    const status = response.status as Extract<
      keyof paths['/user']['get']['responses'],
      ErrorStatus
    >;

    return { error, status: UserStatus[status] as keyof typeof UserStatus };
  }

  return { data };
};
