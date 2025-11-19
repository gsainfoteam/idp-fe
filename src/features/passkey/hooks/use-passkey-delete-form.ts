import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

import { deleteUserPasskey } from '@/data/user';

import { Passkey } from './use-passkey-list';

export function usePasskeyDeleteForm(passkey: Passkey) {
  const { t } = useTranslation();

  const onSubmit = async () => {
    const res = await deleteUserPasskey({ id: passkey.id });

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

  return { onSubmit };
}
