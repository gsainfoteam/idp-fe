import { api } from '@/features/core';

interface RegisterResponse {
  accessToken: string;
}

export const register = async (requestBody: {
  email: string;
  password: string;
  name: string;
  studentId: string;
  phoneNumber: string;
  verificationJwtToken: string;
}) => {
  const modifiedRequestBody = {
    ...requestBody,
    phoneNumber: requestBody.phoneNumber.replace(/-/g, ''),
  };

  const res = await api.post<RegisterResponse>('/user', modifiedRequestBody);
  return res.data;
};
