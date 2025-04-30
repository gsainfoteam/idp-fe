import { api } from '@/features/core';

export const getUserConsent = async () => {
  const res = await api.GET('/user/consent');
  if (res.error || !res.data) throw res.error;
  return res.data;
};
