import type { ErrorStatus } from 'openapi-typescript-helpers';

import { paths } from '@/@types/api-schema';
import { api } from '@/features/core';

export const postOauthConsent = async (
  requestBody: paths['/oauth/consent']['post']['requestBody']['content']['application/json'],
) => {
  const { data, error, response } = await api.POST('/oauth/consent', {
    body: requestBody,
  });

  if (error || !data) {
    const status = response.status as Extract<
      keyof paths['/oauth/consent']['post']['responses'],
      ErrorStatus
    >;

    return { error, status };
  }

  return { data };
};
