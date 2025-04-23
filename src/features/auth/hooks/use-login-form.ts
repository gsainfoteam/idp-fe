import { zodResolver } from '@hookform/resolvers/zod';
import { useLocation, useNavigate } from '@tanstack/react-router';
import { AxiosError } from 'axios';
import { TFunction } from 'i18next';
import { Dispatch, SetStateAction } from 'react';
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

export const useLoginForm = (
  setLoginError: Dispatch<SetStateAction<string | null>>,
) => {
  const { t } = useTranslation();
  const { saveToken } = useToken();
  const navigate = useNavigate({ from: '/auth/login' });
  const location = useLocation();
  const form = useForm({
    resolver: zodResolver(createSchema(t)),
    mode: 'onBlur',
  });
  const onSubmit = form.handleSubmit(async (data) => {
    try {
      const response = await login(data);
      saveToken(response.accessToken);

      navigate({
        from: '/auth/login',
        to: '/authorize',
        search: {
          redirectUrl: location.pathname,
          clientId: '8acf0a32-20a1-4c5d-a0d9-b43e24ea5d50',
        }, // TEST: dummy client
      });
    } catch (error) {
      if (error instanceof AxiosError && error.response?.status === 401) {
        form.resetField('password', { keepError: true });
        setLoginError(t('login.errors.unauthorized'));
      } else {
        console.error(error);
      }
    }
  });

  return { form, onSubmit };
};
