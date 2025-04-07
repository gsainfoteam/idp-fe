import { zodResolver } from '@hookform/resolvers/zod';
import { AxiosError } from 'axios';
import { TFunction } from 'i18next';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';

import { getJWTToken } from '../services/get-token';
import { sendVerificationCode } from '../services/send-verification-code';
import { register } from '../services/use-register';

export const createSchema = (t: TFunction) =>
  z
    .object({
      email: z
        .string()
        .regex(/^\S+@(?:gm\.)?gist\.ac\.kr$/, t('register.errors.email')),
      code: z.string().min(1, t('register.errors.code')).default(''),
      password: z.string().min(12, t('register.errors.password')),
      passwordConfirm: z.string(),
      name: z.string().min(1, t('register.errors.name')),
      studentId: z.string().length(
        8,
        t('register.errors.studentId', {
          form: `${new Date().getFullYear()}0000`,
        }),
      ),
      phoneNumber: z
        .string()
        .regex(
          /^(\+\d{1,2})?\s?\(?(\d{3})\)?[\s.-]?(\d{3,4})[\s.-]?(\d{4})$/,
          t('register.errors.phoneNumber'),
        ),
      verificationJwtToken: z.string().default(''),
    })
    .refine((data) => data.password === data.passwordConfirm, {
      message: t('register.errors.passwordConfirm'),
      path: ['passwordConfirm'],
    });

export type RegisterFormSchema = z.infer<ReturnType<typeof createSchema>>;

export const useRegisterForm = () => {
  const { t } = useTranslation();
  const form = useForm({
    resolver: zodResolver(createSchema(t)),
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
              message: t('register.errors.emailAlreadyExists'),
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
          case 400:
            form.setError('code', {
              message: t('register.errors.invalidCode'),
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

  const onRegister = async (data: RegisterFormSchema) => {
    try {
      await register(data);
      return true;
    } catch (err) {
      if (err instanceof AxiosError) {
        switch (err.response?.status) {
          case 400:
            form.setError('code', {
              message: t('register.errors.invalidCode'),
            });
            break;
          case 409:
            form.setError('email', {
              message: t('register.errors.emailAlreadyExists'),
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
