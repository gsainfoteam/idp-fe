import { zodResolver } from '@hookform/resolvers/zod';
import { AxiosError } from 'axios';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { getJWTToken } from '../services/get-token';
import { sendVerificationCode } from '../services/send-verification-code';
import { register } from '../services/use-register';

export const RegisterSchema = z
  .object({
    email: z
      .string()
      .regex(
        /^\S+@(?:gm\.)?gist\.ac\.kr$/,
        '지스트 메일(@gm.gist.ac.kr, @gist.ac.kr)을 사용해주세요',
      ),
    code: z.string().min(1, '인증번호가 확인되지 않았습니다').default(''),
    password: z.string().min(12, '비밀번호는 12자리 이상이어야 합니다'),
    passwordConfirm: z.string(),
    name: z.string().min(1, '이름을 입력해주세요'),
    studentId: z
      .string()
      .length(8, `${new Date().getFullYear()}0000 형태로 입력해주세요`),
    phoneNumber: z
      .string()
      .regex(
        /^(\+\d{1,2})?\s?\(?(\d{3})\)?[\s.-]?(\d{3,4})[\s.-]?(\d{4})$/,
        '올바른 전화번호를 입력해주세요',
      ),
    verificationJwtToken: z.string().default(''),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: '비밀번호가 일치하지 않습니다',
    path: ['passwordConfirm'],
  });

export type RegisterFormSchema = z.infer<typeof RegisterSchema>;

export const useRegisterForm = () => {
  const form = useForm({
    resolver: zodResolver(RegisterSchema),
    mode: 'onBlur',
  });

  const onSendVerificationCode = async (data: RegisterFormSchema) => {
    try {
      await sendVerificationCode({ email: data.email });
    } catch (err) {
      if (err instanceof AxiosError) {
        switch (err.response?.status) {
          case 409:
            form.setError('email', {
              message: '해당 이메일은 이미 가입되어 있습니다',
            });
            break;
          default:
            console.error(err);
        }
      } else {
        console.error(err);
      }
    }
  };

  const onVerifyCode = async (data: RegisterFormSchema) => {
    try {
      const verifyEmailResponse = await getJWTToken({
        subject: data.email,
        code: data.code,
        hint: 'email',
      });

      form.setValue(
        'verificationJwtToken',
        verifyEmailResponse.verificationJwtToken,
      );

      return true;
    } catch (err) {
      if (err instanceof AxiosError) {
        switch (err.response?.status) {
          case 403:
            form.setError('code', { message: '인증번호가 잘못 되었습니다' });
            break;
          default:
            console.error(err);
        }
      } else {
        console.error(err);
      }
      return false;
    }
  };

  const onRegister = async (data: RegisterFormSchema) => {
    try {
      console.log(data);
      await register(data);
      return true;
    } catch (err) {
      if (err instanceof AxiosError) {
        switch (err.response?.status) {
          case 403:
            form.setError('code', { message: '인증번호가 잘못 되었습니다' });
            break;
          case 409:
            form.setError('email', {
              message: '해당 이메일은 이미 가입되어 있습니다',
            });
            break;
          default:
            console.error(err);
        }
      } else {
        console.error(err);
      }

      return false;
    }
  };

  return { form, onSendVerificationCode, onVerifyCode, onRegister };
};
