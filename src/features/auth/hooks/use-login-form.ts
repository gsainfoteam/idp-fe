import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from '@tanstack/react-router';
import { AxiosError } from 'axios';
import { TFunction } from 'i18next';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';

import { login } from '../services/use-login';

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
  const navigate = useNavigate({ from: '/auth/login' });
  const form = useForm({
    resolver: zodResolver(createSchema(t)),
    mode: 'onBlur',
  });

  const onSubmit = form.handleSubmit(async (data) => {
    try {
      const response = await login(data);
      saveToken(response.accessToken);

      navigate({
        to: '/authorize',
        search: { client_id: '8acf0a32-20a1-4c5d-a0d9-b43e24ea5d50' }, // TEST: dummy client
      });
    } catch (error) {
      if (error instanceof AxiosError && error.response?.status === 401) {
        form.setError('email', { message: ' ' }); // NOTE: 이 구현 맘에 안듦
        form.setError('password', {
          message: t('login.errors.unauthorized'),
        });
        form.resetField('password', { keepError: true });
      } else {
        console.error(error);
      }
    }
  });

  return { form, onSubmit };
};
