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
    verificationJwtToken
}: {
    email: string;
    password: string;
    name: string;
    studentId: string;
    phoneNumber: string;
    verificationJwtToken: string;
}) => {
    const res = await api.post<RegisterResponse>('/user', { email, password, name, studentId, phoneNumber, verificationJwtToken });
    return res.data;
};
