import { paths } from '@/@types/api-schema';
import { api } from '@/features/core';

export const login = async (
  requestBody: paths['/auth/login']['post']['requestBody']['content']['application/json'],
) => {
  const res = await api.POST('/auth/login', { body: requestBody });
  if (res.error || !res.data) throw res.error;
  return res.data;
};
