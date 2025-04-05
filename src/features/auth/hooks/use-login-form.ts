import { zodResolver } from '@hookform/resolvers/zod';
import { AxiosError } from 'axios';
import { TFunction } from 'i18next';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';

import { login } from '../services/use-login';

const createSchema = (t: TFunction<'translation', undefined>) =>
  z.object({
    email: z.string().email(t('login.errors.email')),
    password: z.string().min(1, t('login.errors.password')),
  });

export type LoginFormSchema = z.infer<ReturnType<typeof createSchema>>;

export const useLoginForm = () => {
  const { t } = useTranslation();
  const form = useForm({
    resolver: zodResolver(createSchema(t)),
    mode: 'onBlur',
  });

  const onSubmit = form.handleSubmit(async (data) => {
    login(data)
      .then((r) => console.log(r)) // NOTE: debug
      .catch((error) => {
        if (error instanceof AxiosError && error.response?.status === 401) {
          form.setError('email', { message: ' ' });
          form.setError('password', {
            message: t('login.errors.unauthorized'),
          });
        } else {
          console.error(error);
        }
      });
  });

  return { form, onSubmit };
};
