import { zodResolver } from '@hookform/resolvers/zod';
import { TFunction } from 'i18next';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';

import { useAuth } from './use-auth';
import { useToken } from './use-token';

import { postAuthLogin } from '@/data/post-auth-login';
import { useRecentLogin } from '@/features/oauth';

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
  const { setRecentLogin } = useRecentLogin();

  const onSubmit = form.handleSubmit(async (formData) => {
    const { data, status } = await postAuthLogin(formData);

    if (!data && status) {
      switch (status) {
        case 'LOGIN_FAILURE':
          form.resetField('password', { keepError: true });
          form.setError('root', { message: t('login.errors.unauthorized') });
          break;
        case 'SERVER_ERROR':
          console.error('Server error');
          break;
      }

      return;
    }

    saveToken(data.accessToken);
    await refetch();
    setRecentLogin(new Date());
  });

  return { form, onSubmit };
};
