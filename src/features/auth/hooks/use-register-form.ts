import { zodResolver } from '@hookform/resolvers/zod';
import { TFunction } from 'i18next';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';

import { register } from '../services/use-register';

const createSchema = (t: TFunction<'translation', undefined>) =>
  z
    .object({
      email: z.string().email(t('register.errors.email')),
      password: z.string().min(1, t('register.errors.password')),
      passwordConfirm: z.string().min(1, t('register.errors.password')),
      name: z.string().min(1, t('register.errors.name')),
      studentId: z.string().regex(/^\d{8}$/, t('register.errors.studentId')),
      phoneNumber: z
        .string()
        .regex(/^\d{3}-?\d{4}-?\d{4}$/, t('register.errors.phoneNumber')),
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

  const onSubmit = form.handleSubmit(async (data) => {
    await register(data);
  });

  return { form, onSubmit };
};
