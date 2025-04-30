import { paths } from '@/@types/api-schema';
import { api } from '@/features/core';

export const getJWTToken = async (
  requestBody: paths['/verify']['post']['requestBody']['content']['application/json'],
) => {
  const res = await api.POST('/verify', { body: requestBody });
  if (res.error || !res.data) throw res.error;
  return res.data;
};
