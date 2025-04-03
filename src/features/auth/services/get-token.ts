import { api } from '@/features/core';

export interface VerifyResponse {
  verificationJwtToken: string;
}

interface VerifyRequestBody {
  subject: string;
  code: string;
  hint: 'email';
}

export const getJWTToken = async (requestBody: VerifyRequestBody) => {
  const res = await api.post<VerifyResponse>('/verify', requestBody);
  return res.data;
};
