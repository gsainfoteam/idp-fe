import type { ErrorStatus } from 'openapi-typescript-helpers';

import { paths } from '@/@types/api-schema';
import { api } from '@/features/core';

export const postAuthLogin = async (
  requestBody: paths['/auth/login']['post']['requestBody']['content']['application/json'],
) => {
  const { data, error, response } = await api.POST('/auth/login', {
    body: requestBody,
  });

  if (error || !data) {
    const status = response.status as Extract<
      keyof paths['/auth/login']['post']['responses'],
      ErrorStatus
    >;

    return { error, status };
  }

  return { data };
};
