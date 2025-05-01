import type { ErrorStatus } from 'openapi-typescript-helpers';

import { paths } from '@/@types/api-schema';
import { api } from '@/features/core';

export const postVerify = async (
  requestBody: paths['/verify']['post']['requestBody']['content']['application/json'],
) => {
  const { data, error, response } = await api.POST('/verify', {
    body: requestBody,
  });

  if (error || !data) {
    const status = response.status as Extract<
      keyof paths['/verify']['post']['responses'],
      ErrorStatus
    >;

    return { error, status };
  }

  return { data };
};
