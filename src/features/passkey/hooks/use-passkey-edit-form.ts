import { zodResolver } from '@hookform/resolvers/zod';
import { type TFunction } from 'i18next';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import z from 'zod';

import { type Passkey } from './use-passkey-list';

import { patchUserPasskey } from '@/data/user';

const createSchema = (t: TFunction) =>
  z.object({
    name: z.string().min(1, t('passkey.steps.list.errors.name_required')),
  });

export function usePasskeyEditForm(passkey: Passkey) {
  const { t } = useTranslation();
  const form = useForm({
    resolver: zodResolver(createSchema(t)),
    mode: 'onChange',
  });

  const submitHandler = async (
    data: z.infer<ReturnType<typeof createSchema>>,
  ) => {
    const res = await patchUserPasskey({ id: passkey.id }, { name: data.name });

    if (!res.ok) {
      if (res.status === 401) {
        toast.error(t('toast.invalid_token'));
      } else if (res.status === 403) {
        toast.error(t('toast.invalid_user'));
      } else if (res.status === 404) {
        toast.error(t('passkey.steps.list.errors.passkey_not_found'));
      } else if (res.status === 500) {
        toast.error(t('toast.server_error'));
      } else {
        toast.error(t('toast.unknown_error'));
      }

      return false;
    }

    return true;
  };

  const onSubmit = async (): Promise<boolean> => {
    return new Promise((resolve) => {
      form.handleSubmit(async (data) => {
        const result = await submitHandler(data);
        resolve(result);
      })();
    });
  };

  return { form, onSubmit };
}
