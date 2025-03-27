import { api } from '@/features/core';

interface RegisterResponse {
  accessToken: string;
}

export const register = async ({
  email,
  password,
  name,
  studentId,
  phoneNumber,
}: {
  email: string;
  password: string;
  name: string;
  studentId: string;
  phoneNumber: string;
}) => {
  const res = await api.post<RegisterResponse>('/user', {
    email,
    password,
    name,
    studentId,
    phoneNumber,
  });
  return res.data;
};
