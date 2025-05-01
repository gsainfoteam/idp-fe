import type { ErrorStatus } from 'openapi-typescript-helpers';

import { paths } from '@/@types/api-schema';
import { api } from '@/features/core';

enum UserConsentStatus {
  UNAUTHORIZED = 401,
  SERVER_ERROR = 500,
}

export const getUserConsent = async () => {
  const { data, error, response } = await api.GET('/user/consent');

  if (error || !data) {
    const status = response.status as Extract<
      keyof paths['/user/consent']['get']['responses'],
      ErrorStatus
    >;

    return {
      error,
      status: UserConsentStatus[status] as keyof typeof UserConsentStatus,
    };
  }

  return { data };
};
