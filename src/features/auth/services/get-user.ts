import { api } from '@/features/core';

export interface UserResponse {
  name: string;
  uuid: string;
  profile: string;
  email: string;
  studentId: string;
  phoneNumber: string;
  createdAt: string;
  updatedAt: string;
}

export const getUser = async () => {
  const res = await api.get<UserResponse>('/user');
  return res.data;
};
