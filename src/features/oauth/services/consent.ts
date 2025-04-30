import { api } from '@/features/core';

export type ConsentRequestBody = {
  client_id: string;
  scope: string;
};

export const consent = async (requestBody: ConsentRequestBody) => {
  const res = await api.post<void>('/oauth/consent', requestBody);
  return res.data;
};
