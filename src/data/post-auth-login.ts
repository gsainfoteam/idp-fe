import type { ErrorStatus } from 'openapi-typescript-helpers';

import { paths } from '@/@types/api-schema';
import { api } from '@/features/core';

enum AuthLoginStatus {
  LOGIN_FAILURE = 401,
  SERVER_ERROR = 500,
}

export const postAuthLogin = async (
  requestBody: paths['/auth/login']['post']['requestBody']['content']['application/json'],
) => {
  try {
    const { data } = await api.POST('/auth/login', {
      body: requestBody,
    });

    return { data };
  } catch (err) {
    const status = (err as Response).status as Extract<
      keyof paths['/auth/login']['post']['responses'],
      ErrorStatus
    >;

    return {
      status: AuthLoginStatus[status] as keyof typeof AuthLoginStatus,
    };
  }
};
