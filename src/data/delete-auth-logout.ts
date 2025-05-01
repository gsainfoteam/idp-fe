import type { ErrorStatus } from 'openapi-typescript-helpers';

import { paths } from '@/@types/api-schema';
import { api } from '@/features/core';

export const deleteAuthLogout = async () => {
  const { data, error, response } = await api.DELETE('/auth/logout');

  if (error || !data) {
    const status = response.status as Extract<
      keyof paths['/auth/logout']['delete']['responses'],
      ErrorStatus
    >;

    return { error, status };
  }

  return { data };
};
