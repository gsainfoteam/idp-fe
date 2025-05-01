import type { ErrorStatus } from 'openapi-typescript-helpers';

import { paths } from '@/@types/api-schema';
import { api } from '@/features/core';

enum VerifyStatus {
  INVALID_CERTIFICATE = 400,
  SERVER_ERROR = 500,
}

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

    return { error, status: VerifyStatus[status] as keyof typeof VerifyStatus };
  }

  return { data };
};
