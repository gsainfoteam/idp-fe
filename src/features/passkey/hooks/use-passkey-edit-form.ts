import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

import { patchUserPasskey } from '@/data/patch-user-passkey';
import { zodResolver } from '@hookform/resolvers/zod';
import { TFunction } from 'i18next';
import z from 'zod';

import { Passkey } from './use-passkey-list';

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
    const { status } = await patchUserPasskey(passkey.id, data);

    if (status) {
      switch (status) {
        case 'INVALID_TOKEN':
          toast.error(t('toast.invalid_token'));
          return false;
        case 'INVALID_USER':
          toast.error(t('toast.invalid_user'));
          return false;
        case 'INVALID_ID':
          toast.error(t('passkey.steps.list.errors.passkey_not_found'));
          return false;
        case 'SERVER_ERROR':
          toast.error(t('toast.server_error'));
          return false;
        case 'UNKNOWN_ERROR':
          toast.error(t('toast.unknown_error'));
          return false;
      }
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
