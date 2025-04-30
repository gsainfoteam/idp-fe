import { api } from '@/features/core';

export const getUser = async () => {
  const res = await api.GET('/user');
  if (res.error || !res.data) throw res.error;
  return res.data;
};
