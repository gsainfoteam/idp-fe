import type { ErrorStatus } from 'openapi-typescript-helpers';

import { paths } from '@/@types/api-schema';
import { api } from '@/features/core';

enum OauthConsentStatus {
  SERVER_ERROR = 500,
}

export const postOauthConsent = async (
  requestBody: paths['/oauth/consent']['post']['requestBody']['content']['application/json'],
) => {
  try {
    const { data } = await api.POST('/oauth/consent', {
      body: requestBody,
    });

    return { data };
  } catch (err) {
    if (err instanceof Response) {
      const status = err.status as Extract<
        keyof paths['/oauth/consent']['post']['responses'],
        ErrorStatus
      >;

      return {
        status: OauthConsentStatus[status] as keyof typeof OauthConsentStatus,
      };
    }

    return {
      status: 'UNKNOWN_ERROR' as const,
    };
  }
};
