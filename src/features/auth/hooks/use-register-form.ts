import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { register } from '../services/use-register';

const schema = z
  .object({
    email: z.string().email('이메일 형식이 아닙니다'),
    password: z.string().min(1, '비밀번호를 입력해주세요'),
    passwordConfirm: z.string().min(1, '비밀번호를 입력해주세요'),
    name: z.string().min(1, '이름을 입력해주세요'),
    studentId: z.string().regex(/^\d{8}$/, '학번 형식이 아닙니다'),
    phoneNumber: z
      .string()
      .regex(/^\d{3}-?\d{4}-?\d{4}$/, '전화번호 형식이 아닙니다'),
    verificationJwtToken: z.string().min(1),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: '비밀번호가 일치하지 않습니다',
    path: ['passwordConfirm'],
  });

export type RegisterFormSchema = z.infer<typeof schema>;

export const useRegisterForm = () => {
  const form = useForm({
    resolver: zodResolver(schema),
    mode: 'onBlur',
  });

  const onSubmit = form.handleSubmit(async (data) => {
    await register(data);
  });

  return { form, onSubmit };
};
