import { zodResolver } from '@hookform/resolvers/zod';
import { TFunction } from 'i18next';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';

import { postAuthLogin } from '@/data/auth';
import { useRecentLogin } from '@/features/oauth';

import { useAuth } from './use-auth';
import { useToken } from './use-token';

const createSchema = (t: TFunction) =>
  z.object({
    email: z
      .string()
      .regex(
        /^\S+@(?:gm\.)?gist\.ac\.kr$/,
        t('login.inputs.email.errors.format'),
      ),
    password: z.string().min(1, t('login.inputs.password.errors.format')),
  });

export type LoginFormSchema = z.infer<ReturnType<typeof createSchema>>;

export const useLoginForm = () => {
  const { t } = useTranslation();
  const { saveToken } = useToken();
  const form = useForm({
    resolver: zodResolver(createSchema(t)),
    mode: 'onChange',
  });
  const { refetch } = useAuth();
  const { setRecentLogin } = useRecentLogin();

  const onSubmit = form.handleSubmit(async (formData) => {
    const res = await postAuthLogin(formData);

    if (!res.ok) {
      if (res.status === 401) {
        form.resetField('password', { keepError: true });
        form.setError('root', { message: t('login.errors.unauthorized') });
      } else if (res.status === 500) {
        toast.error(t('toast.server_error'));
      } else {
        toast.error(t('toast.unknown_error'));
      }

      return;
    }

    setRecentLogin(new Date());
    saveToken(res.data.accessToken);
    await refetch();
  });

  return { form, onSubmit };
};
