import type { ErrorStatus } from 'openapi-typescript-helpers';

import { paths } from '@/@types/api-schema';
import { api } from '@/features/core';

export const getUser = async () => {
  const { data, error, response } = await api.GET('/user');

  if (error || !data) {
    const status = response.status as Extract<
      keyof paths['/user']['get']['responses'],
      ErrorStatus
    >;

    return { error, status };
  }

  return { data };
};
