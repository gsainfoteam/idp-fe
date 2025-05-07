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
  try {
    const { data } = await api.POST('/verify', {
      body: requestBody,
    });

    return { data };
  } catch (err) {
    const status = (err as Response).status as Extract<
      keyof paths['/verify']['post']['responses'],
      ErrorStatus
    >;

    return {
      status: VerifyStatus[status] as keyof typeof VerifyStatus,
    };
  }
};
