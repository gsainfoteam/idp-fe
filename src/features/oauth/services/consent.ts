import { paths } from '@/@types/api-schema';
import { api } from '@/features/core';

export type ConsentRequestBody =
  paths['/oauth/consent']['post']['requestBody']['content']['application/json'];

export const consent = async (requestBody: ConsentRequestBody) => {
  const res = await api.POST('/oauth/consent', { body: requestBody });
  if (res.error || !res.data) throw res.error;
  return res.data;
};
