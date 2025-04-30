import { paths } from '@/@types/api-schema';
import { api } from '@/features/core';

export const sendVerificationCode = async (
  requestBody: paths['/verify/email']['post']['requestBody']['content']['application/json'],
) => {
  const res = await api.POST('/verify/email', { body: requestBody });
  if (res.error || !res.data) throw res.error;
  return res.data;
};
