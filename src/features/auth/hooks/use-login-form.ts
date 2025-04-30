import { zodResolver } from '@hookform/resolvers/zod';
import { AxiosError } from 'axios';
import { TFunction } from 'i18next';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';

import { login } from '../services/use-login';

import { useAuth } from './use-auth';
import { useToken } from './use-token';

const createSchema = (t: TFunction) =>
  z.object({
    email: z.string().email(t('login.errors.email')),
    password: z.string().min(1, t('login.errors.password')),
  });

export type LoginFormSchema = z.infer<ReturnType<typeof createSchema>>;

export const useLoginForm = () => {
  const { t } = useTranslation();
  const { saveToken } = useToken();
  const form = useForm({
    resolver: zodResolver(createSchema(t)),
    mode: 'onBlur',
  });
  const { refetch } = useAuth();

  const onSubmit = form.handleSubmit(async (data) => {
    try {
      const response = await login(data);
      saveToken(response.accessToken);
      await refetch();
    } catch (error) {
      if (error instanceof AxiosError && error.response?.status === 401) {
        form.resetField('password', { keepError: true });
        form.setError('root', { message: t('login.errors.unauthorized') });
      } else {
        console.error(error);
      }
    }
  });

  return { form, onSubmit };
};
