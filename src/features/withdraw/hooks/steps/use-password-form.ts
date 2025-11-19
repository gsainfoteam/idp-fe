import { zodResolver } from '@hookform/resolvers/zod';
import { TFunction } from 'i18next';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';

import { postAuthLogin } from '@/data/auth';
import { useAuth } from '@/features/auth';

const createSchema = (t: TFunction) =>
  z.object({
    password: z
      .string()
      .min(1, t('withdraw.steps.password.inputs.password.errors.format')),
  });

export function usePasswordForm({
  onNext,
}: {
  onNext: (password: string) => void;
}) {
  const { t } = useTranslation();
  const schema = createSchema(t);
  const { user } = useAuth();

  const { setError, resetField, register, handleSubmit, formState } = useForm<
    z.infer<typeof schema>
  >({
    resolver: zodResolver(schema),
  });

  const onSubmit = handleSubmit(async (data) => {
    if (!user?.email) return;
    const res = await postAuthLogin({
      email: user.email,
      password: data.password,
    });

    if (!res.ok) {
      if (res.status === 401) {
        resetField('password', { keepError: true });
        setError('root', {
          message: t(
            'withdraw.steps.password.inputs.password.errors.unauthorized',
          ),
        });
      } else if (res.status === 500) {
        toast.error(t('toast.server_error'));
      } else {
        toast.error(t('toast.unknown_error'));
      }

      return;
    }

    onNext(data.password);
  });
  return { register, onSubmit, formState };
}
