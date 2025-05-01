import { zodResolver } from '@hookform/resolvers/zod';
import { TFunction } from 'i18next';
import { isValidPhoneNumber } from 'libphonenumber-js';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';

import { postUser } from '@/data/post-user';
import { postVerify } from '@/data/post-verify';
import { postVerifyEmail } from '@/data/post-verify-email';

export const createSchema = (t: TFunction) =>
  z
    .object({
      email: z
        .string()
        .regex(/^\S+@(?:gm\.)?gist\.ac\.kr$/, t('register.errors.email')),
      code: z
        .string()
        .regex(/^\d{6}$/, t('register.errors.code'))
        .default(''),
      password: z.string().min(12, t('register.errors.password')),
      passwordConfirm: z.string(),
      name: z.string().min(1, t('register.errors.name')),
      studentId: z.string().regex(
        /^\d{5}$|^\d{8}$/,
        t('register.errors.student_id', {
          form: `${new Date().getFullYear()}0000`,
        }),
      ),
      phoneNumber: z
        .string()
        .refine(
          (value) => isValidPhoneNumber(value, 'KR'),
          t('register.errors.phone_number'),
        ),
      verificationJwtToken: z.string().default(''),
    })
    .refine((data) => data.password === data.passwordConfirm, {
      message: t('register.errors.password_confirm'),
      path: ['passwordConfirm'],
    });

export type RegisterFormSchema = z.infer<ReturnType<typeof createSchema>>;

export const useRegisterForm = () => {
  const { t } = useTranslation();
  const form = useForm({
    resolver: zodResolver(createSchema(t)),
    mode: 'onBlur',
  });

  const onSendVerificationCode = async (formData: RegisterFormSchema) => {
    const { status } = await postVerifyEmail({
      email: formData.email,
    });

    if (status) {
      switch (status) {
        case 500:
          console.error('Server error');
          break;
      }
    }
  };

  const onVerifyCode = async (formData: RegisterFormSchema) => {
    const { data, status } = await postVerify({
      subject: formData.email,
      code: formData.code,
      hint: 'email',
    });

    if (!data && status) {
      switch (status) {
        case 400:
          form.setError('code', {
            message: t('register.errors.invalid_code'),
          });
          break;
        case 500:
          console.error('Server error');
          break;
      }

      return false;
    }

    form.setValue('verificationJwtToken', data.verificationJwtToken);
    return true;
  };

  const onSubmit = form.handleSubmit(async (formData: RegisterFormSchema) => {
    const { status } = await postUser(formData);

    if (status) {
      switch (status) {
        case 403:
          form.setError('verificationJwtToken', {
            message: t('register.errors.invalid_token'),
          });
          break;
        case 409:
          form.setError('email', {
            message: t('register.errors.email_already_exists'),
          });
          break;
        case 500:
          console.error('Server error');
          break;
      }
    }
  });

  return { form, onSendVerificationCode, onVerifyCode, onSubmit };
};
